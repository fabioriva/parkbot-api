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

Il frontend usa le chiavi `log.op-...` e `history_table.op-...` per descrizioni e
titoli; gli ID non vengono reinterpretati dal browser. Il log di una richiesta
indica il tipo di azione registrata, senza attestare il completamento del movimento PLC.

## Allineamento dello storico

Le conversioni previste per l'allineamento sono state:

- Menlo A/B, eventi PLC: 12 → 15, 13 → 16, 14 → 17.
- Bugrashov e Sotefin, eventi PLC: 12 → 14; 13 resta 13.
- Muse, eventi PLC: 12 resta 12.
- Tutti gli APS, azioni app: il vecchio 12 diventa 14 solo per `card: 0`
  (passo-passo); con tessera positiva resta 12 (rollback). La cancellazione
  coda resta 13. Le occupazioni e i blocchi manuali mantengono l'ID 5;
  le liberazioni mantengono l'ID 6 (FREE è sempre zero).

La migrazione si è conclusa su Bugrashov, Menlo A e Menlo B; le anteprime di
Sotefin e Muse non richiedevano conversioni. Gli script temporanei e il comando
`migrate:operations` sono stati ritirati. La loro implementazione resta nella
cronologia Git, nel commit `03cb556`.

Le API non aggiungono più `operationVersion` ai nuovi record. Il frontend non
usa né questo campo né `operationMigration`: le descrizioni dipendono da
`operation` e dal catalogo comune. La distinzione dei blocchi manuali con un
ID dedicato resta rinviata; KN mantiene i propri codici 95–99.

## Rimozione dei metadati temporanei

Distribuire prima il codice aggiornato e riavviare tutte le API che scrivono
nei database interessati, così che non aggiungano nuovamente `operationVersion`.
Conservare il backup della migrazione prima di eliminare `operationMigration`,
che contiene l'ID precedente dei record convertiti.

Le istruzioni seguenti si eseguono in **mongosh**, con la connessione MongoDB
abituale. I database elencati sono quelli già allineati; eventuali altri APS
vanno verificati separatamente.

Anteprima, senza modifiche:

```js
var operationMetadataDatabases = ["sotefin", "bugrashov", "menloa", "menlob", "muse"];
var operationMetadataFilter = {
  $or: [
    { operationVersion: { $exists: true } },
    { operationMigration: { $exists: true } }
  ]
};
operationMetadataDatabases.forEach(name => {
  printjson({
    database: name,
    daRipulire: db.getSiblingDB(name).logs.countDocuments(operationMetadataFilter)
  });
});
```

Dopo aver verificato i conteggi, nello stesso **mongosh**:

```js
operationMetadataDatabases.forEach(name => {
  var result = db.getSiblingDB(name).logs.updateMany(
    operationMetadataFilter,
    { $unset: { operationVersion: "", operationMigration: "" } }
  );
  printjson({ database: name, modificati: result.modifiedCount });
});
```

Ripetere l'anteprima: `daRipulire` deve essere zero per ogni database.
L'aggiornamento elimina soltanto i due metadati; `operation`, date e contenuto
degli eventi restano invariati. È ripetibile senza rinumerare alcuna operazione.
Dopo la pulizia non rieseguire gli script della vecchia migrazione: senza i
marcatori non possono più distinguere i documenti già allineati.

Verifiche locali senza connessione al database:
`npm run test:db` e `node --test --experimental-test-isolation=none test/utc-history.test.js`.
