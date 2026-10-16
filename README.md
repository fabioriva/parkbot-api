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
