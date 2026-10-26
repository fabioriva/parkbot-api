# 🤖 Parkbot API

Backend per il monitoraggio e la gestione degli impianti di parcheggio
automatico (APS). Collega i sistemi di automazione all’interfaccia web Parkbot,
esponendo API HTTP e aggiornamenti in tempo reale tramite WebSocket.

## ⚙️ Funzionalità

- Comunicazione con i PLC per la lettura dello stato e l’invio dei comandi.
- Monitoraggio di dispositivi, allarmi, occupazione e stato degli stalli.
- Gestione delle operazioni di ingresso, uscita e delle code di prelievo.
- Raccolta dello storico degli eventi e delle azioni degli utenti.
- Statistiche sulle operazioni con gestione dei fusi orari degli impianti.
- Gestione delle tessere e dei destinatari delle notifiche.
- Inoltro degli allarmi al servizio di notifiche email di Parkbot App.
- Controllo degli accessi in base alla sessione, al ruolo e agli impianti assegnati.
- Configurazioni e modelli dedicati alle diverse installazioni.

Le funzionalità disponibili dipendono dalla configurazione dell’impianto
e dalle autorizzazioni dell’utente.

## 🔑 Accesso al servizio

I servizi Parkbot sono offerti da [Sotefin SA](https://www.sotefin.com)
e ospitati su server di proprietà della società. L’utilizzo richiede una
sottoscrizione da parte del cliente e l’abilitazione degli utenti agli impianti previsti.

La disponibilità pubblica di questo repository non include l’accesso
al servizio, ai dati o agli impianti dei clienti.

Per informazioni commerciali e attivazione, contattare [Sotefin SA](https://www.sotefin.com).

## 🛠️ Stack tecnologico

| Ambito | Tecnologie |
| --- | --- |
| Runtime e linguaggio | Node.js e JavaScript con moduli ES |
| API e aggiornamenti in tempo reale | uWebSockets.js, HTTP e WebSocket |
| Comunicazione con i PLC | node-snap7 per PLC Siemens S7 |
| Messaggistica | MQTT nelle installazioni configurate |
| Database | MongoDB |
| Autenticazione e sessioni | Better Auth, integrato con Parkbot App |
| Date e fusi orari | date-fns e date-fns-tz |
| Logging | Pino |
| Gestione dei processi | PM2 |

Il backend acquisisce i dati dai sistemi di automazione, registra gli eventi
e rende disponibili stato e comandi all’interfaccia web. Le connessioni
WebSocket distribuiscono gli aggiornamenti in tempo reale ai client autorizzati.

## 📚 Documentazione tecnica

- [Date e fusi orari: contratto PLC, backend e frontend](docs/date-time.md)
- [Catalogo delle operazioni e migrazione](docs/migration/operation-ids.md)

### Formattazione JavaScript

Il workspace consiglia l'estensione VS Code **StandardJS - JavaScript Standard Style**
e abilita la correzione automatica al salvataggio. Per applicare le correzioni
manualmente a tutti i file JavaScript inclusi, eseguire `npm run format`.
`npm test` controlla lo stile senza modificare i file. La correzione automatica
non è supportata con `files.autoSave` impostato su `afterDelay`.

### Coordinamento della connessione PLC

`lib/PlcConnection.js` gestisce una coda per ogni client Snap7: letture,
scritture, connessione e disconnessione condividono lo stesso accesso.
Il client Snap7 originale viene passato esplicitamente all'operazione:

```js
await connection.run(client => ReadArea(client, area, dbNumber, start, amount, wordLen))
await connection.runCommand(client => new PlcClockCommands({ client }).setClock(new Date()))
```

`run` permette le letture durante il caricamento; `runCommand` richiede che
il PLC sia pronto. Le chiamate native vanno attese una per volta, prima di
terminare la funzione; la funzione non deve richiamare la coda dall'interno.
La connessione usa le callback native; una disconnessione attende la fine
dell'operazione in corso e invalida le richieste ancora in attesa.

Il polling può leggere durante il caricamento iniziale. I comandi HTTP sono
abilitati e `comm: true` viene pubblicato solo dopo il caricamento completo
di allarmi, tessere, dati e mappa. Ogni riconnessione richiede un nuovo
caricamento; i comandi ricevuti mentre il PLC non è pronto restituiscono HTTP 503.
L'impostazione dell'orologio mantiene l'accesso esclusivo per tutta la sequenza.

Se la lettura dell'orologio riesce ma il relativo stato PLC non è zero, il polling
mantiene la connessione e riprova. Nel frattempo pubblica `comm: false` e blocca
i comandi; alla prima lettura valida ricarica tutti i dati prima di riabilitarli.
Gli errori di comunicazione continuano a richiedere la riconnessione.
Il log segnala una sola volta ogni attesa dell'orologio, con livello `warn` e
relativo stato PLC. Al completamento di ogni caricamento pubblica un messaggio
`info`: `PLC data loaded; commands enabled`.

Daman mantiene due client e due code indipendenti. Il client dei comandi deve
aver completato una lettura di controllo e richiede anche che il client dei dati
sia pronto.

Le richieste invalidate non vengono ripetute dopo la riconnessione. Un comando
già inviato alla libreria nativa può invece avere esito incerto in caso di errore:
non viene ritentato automaticamente.

Verifica locale, con client simulati: `npm run test:commands`.
