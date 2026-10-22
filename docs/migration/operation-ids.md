# Catalogo delle operazioni e migrazione

`lib/operationDefinitions.js` definisce lo stesso significato per gli ID usati
da `History.saveAction`, `History.saveLog` e dalla collezione MongoDB `operations`.
Ogni `str.js` esporta `createOperationDefinitions()`; KN aggiunge i propri codici
95–99, che restano invariati anche nello storico.

| ID | Key |
| --- | --- |
| 0 | `op-no` |
| 1 | `op-alarm-on` |
| 2 | `op-alarm-off` |
| 3 | `op-switch-mode` |
| 4 | `op-change-pin` |
| 5 | `op-stall-in` |
| 6 | `op-stall-out` |
| 7 | `op-shuffle-in` |
| 8 | `op-shuffle-out` |
| 9 | `op-stall-rsv` |
| 10 | `op-req-exit` |
| 11 | `op-req-entry` |
| 12 | `op-req-rollback` |
| 13 | `op-req-queue` |
| 14 | `op-req-pp` |
| 15 | `op-req-swap` |
| 16 | `op-req-repark` |
| 17 | `op-card-issued` |

I nuovi documenti hanno `operationVersion: 1`. Il frontend usa le chiavi
`log.op-...` e `history_table.op-...` per descrizioni e titoli; gli ID non
vengono reinterpretati dal browser. Il log di una richiesta indica il tipo
di azione registrata, senza attestare il completamento del movimento PLC.

Anteprima sul database di un solo impianto, senza scritture:

```bash
npm run migrate:operations -- --def aps/us/menloa/def.js
```

Il nome del database viene dal `def.js` indicato.
La connessione usa `MONGODB_URI` da `.env`. Il rapporto riporta i conteggi
per conversione, i record da verificare e gli eventuali conflitti di metadati.
Non stampa documenti, email o credenziali. Per KN usare il `def.js` di
`aps/in/kn/left/` oppure `right/`, rispettivamente per `knl` e `knr`.

Le conversioni dello storico sono:

- Menlo A/B, eventi PLC: 12 → 15, 13 → 16, 14 → 17.
- Bugrashov e Sotefin, eventi PLC: 12 → 14; 13 resta 13.
- Muse, eventi PLC: 12 resta 12.
- Tutti gli APS, azioni app: il vecchio 12 diventa 14 solo per `card: 0`
  (passo-passo); con tessera positiva resta 12 (rollback). La cancellazione
  coda resta 13. Le occupazioni e i blocchi manuali mantengono l'ID 5;
  le liberazioni mantengono l'ID 6 (FREE è sempre zero).

La presenza di un `user` stringa non vuota identifica le azioni app; l'assenza
o `null` identifica gli eventi PLC. Codici non definiti nella vecchia tabella,
dati ambigui o ID provvisori 100–102 vengono segnalati e bloccano `--apply`.
La distinzione dei blocchi manuali con un ID dedicato è rinviata a un intervento
successivo. Il codice 97 di KN (`op-stall-lck`) resta invariato, come gli altri
codici specifici 95–99.

Rilascio da coordinare prima di usare il nuovo catalogo in produzione:

1. Eseguire le anteprime e verificare i conteggi per ogni database interessato,
   quindi predisporre un backup dei database, incluse le definizioni `operations`.
2. Preparare i PLC: Bugrashov/Sotefin devono emettere 14 per il passo-passo;
   Menlo A/B devono emettere 15, 16 e 17 per swap, re-park ed emissione tessera.
   Verificare anche eventuali altri codici realmente generati dai programmi PLC.
3. Nella finestra di rilascio, esaurire gli eventi del vecchio programma con
   le vecchie API e sospendere la generazione di eventi. Fermare tutti i processi
   che scrivono nel database dell'APS, compresi eventuali processi manuali.
   Aggiornare il PLC assicurandosi che il buffer non contenga vecchi codici:
   un vecchio evento letto dalle nuove API sarebbe marcato come nuovo.
4. Con gli scrittori ancora fermi, completare il backup consistente del database,
   ripetere l'anteprima e applicare:

   ```bash
   npm run migrate:operations -- --def aps/us/menloa/def.js --apply
   ```

5. Pubblicare la nuova app (build inclusa) e avviare le API aggiornate. L'avvio
   sincronizza `operations` con il catalogo comune; verificare storico, nuovi
   eventi e comandi. Non avviare le nuove API contro PLC o storico non allineati.

L'applicazione modifica solo i record che richiedono una conversione. Conserva
in ogni documento `operationMigration.from`, `to` e `migratedAt`, insieme a
`operationVersion: 1`. Le modifiche al singolo documento sono atomiche; l'intera
migrazione non è una transazione. In caso di interruzione si può ripetere il
comando: i record già marcati non vengono convertiti nuovamente. I record storici
con ID già corretto restano invariati. Per un rollback completo usare il backup
con PLC/API precedenti; i nuovi eventi richiedono una valutazione separata.

Verifiche locali senza connessione al database: `npm run test:db`.
