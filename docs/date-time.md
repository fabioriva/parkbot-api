# Date e ora: contratto PLC, backend e frontend

Il timestamp di ogni evento rappresenta un istante UTC. Il fuso del server e
quello del browser non devono modificarlo. Il frontend usa il fuso IANA
configurato per l'impianto (per esempio Asia/Dubai) per visualizzare le date
e interpretare i filtri inseriti dall'utente.

## PLC

DATE e TOD nel messaggio log devono essere ricavati dalla stessa lettura UTC
con RD_SYS_T, senza sovrascriverla con RD_LOC_T:

```scl
IF #SetRequest = B#16#01 THEN
    #WriteStatus := WR_SYS_T(IN := #SetUTC);
    // Richiesta elaborata: il risultato resta in WriteStatus.
    #SetRequest := B#16#00;
END_IF;

// Mantiene aggiornato il DTL letto da readPlcClock nel backend.
#ReadStatus := RD_SYS_T(#NowUTC);

// DT di tipo DATE_AND_TIME, come nel codice PLC originale.
#TERR := RD_SYS_T(#DT);
IF #TERR = 0 THEN
    #DATE := DT_TO_DATE(#DT);
    #TOD := DT_TO_TOD(#DT);
END_IF;

#TIME := TIME_TCK();
```

Adattare tipi e conversioni alla CPU: RD_SYS_T su S7-1200 usa DTL;
su S7-1500 supporta anche DT. Non cambiare il layout del DB dell'orologio
senza aggiornare gli offset in readPlcClock e setPlcClock.

Il produttore dei log deve gestire un errore di lettura, senza registrare
DATE/TOD precedenti come se fossero un timestamp aggiornato.
SetUTC deve contenere UTC e la CPU deve essere impostata/sincronizzata in UTC.
TIME_TCK serve per le durate, con gestione del ritorno a zero del contatore.

## Messaggio e database

Il messaggio log resta di 32 byte:

| Offset | Campo | Significato |
| --- | --- | --- |
| 20 | DATE, UInt16 BE | Giorni dal 1990-01-01 UTC |
| 22 | TOD, UInt32 BE | Millisecondi dalla mezzanotte UTC |

getPlcDateTime restituisce millisecondi Unix:
Date.UTC(1990, 0, 1) + days * 86400000 + msec.

History salva i log PLC e le azioni come Date JavaScript (BSON Date in MongoDB).
La serializzazione JSON restituisce stringhe ISO con Z.
Esempio: 2026-01-27T11:18:47.731Z corrisponde alle 15:18:47.731 a Dubai.

## Mappa degli stalli

`models/Stall.js` espone `date` come stringa ISO UTC con `Z`, sia nella
risposta HTTP `/map` sia negli aggiornamenti WebSocket. La conversione da
DATE/TOD usa campi senza segno agli offset 2 (UInt16 BE) e 4 (UInt32 BE),
preserva i millisecondi e non dipende dal fuso del server.
Il valore iniziale è `1990-01-01T00:00:00.000Z`.

Anche DATE/TOD degli stalli devono rappresentare UTC nel PLC. Il frontend
converte questi istanti nel fuso dell'impianto, come per lo storico.

## Frontend

Esempio con date-fns-tz, da integrare nel repository frontend:

```js
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'

const timeZone = 'Asia/Dubai' // configurazione dell'impianto

const text = formatInTimeZone(
  log.date,
  timeZone,
  'dd/MM/yyyy HH:mm:ss'
)

// Valori del selettore data/ora: ora locale dell'impianto, senza Z.
const dateFrom = fromZonedTime('2026-01-27T00:00:00', timeZone).toISOString()
const dateTo = fromZonedTime('2026-01-28T00:00:00', timeZone).toISOString()

const params = new URLSearchParams({ dateFrom, dateTo })
```

L'endpoint history richiede dateFrom/dateTo ISO con Z o offset esplicito.
Non inviare date/ore locali prive di offset.
L'intervallo include dateFrom ed esclude dateTo: per un giorno intero usare
la mezzanotte locale successiva come estremo finale. Convertire separatamente
i due estremi: nei fusi con ora legale un giorno non dura sempre 24 ore.
Per orari locali ambigui o inesistenti durante il cambio d'ora occorre una
regola esplicita nell'interfaccia.

Il backend confronta direttamente gli istanti, senza aggiungere un'ora.

## Attivazione e dati esistenti

Coordinare l'attivazione delle modifiche PLC, backend e frontend.
Prima del cambio, gestire anche eventuali log in coda nel PLC: i vecchi
messaggi locali hanno lo stesso layout dei nuovi messaggi UTC.

I record esistenti non vengono migrati. Eventuali correzioni richiedono di
conoscere la precedente semantica e il fuso dell'impianto alla data dell'evento.
Le azioni storiche salvate come numero richiedono a loro volta una migrazione
del tipo BSON per essere confrontate con i nuovi campi Date.

## Statistiche e dashboard

Configurare il fuso IANA dell'impianto con `def.TIME_ZONE` (precedenza) oppure
con la variabile d'ambiente `APS_TIME_ZONE`, per esempio `Asia/Dubai` o
`America/Los_Angeles`. In assenza di configurazione il fuso è UTC; il fuso del
server non viene usato. Il router applica il fuso configurato alle statistiche
e alla scelta del giorno corrente della dashboard.

`getOperations`, `getCards` e `getDevices` accettano `dateFrom`/`dateTo` come
istanti ISO con Z o offset esplicito: l'intervallo è `[dateFrom, dateTo)`.
Per compatibilità, accettano anche `YYYY-MM-DD`, interpretato come mezzanotte
nel fuso dell'impianto. Con estremi uguali selezionano l'intero giorno locale.
Date/ore prive di offset e intervalli invertiti vengono rifiutati.

`getOperations({ dateString: '2026-10-05' }, timeZone)` restituisce i report
giornaliero, settimana precedente (lunedì–lunedì), mese precedente e ultimo
anno fino alla mezzanotte della data selezionata. I confini vengono convertiti
separatamente in UTC, rispettando i giorni di 23 o 25 ore. MongoDB raggruppa
ore, giorni e mesi nello stesso fuso, senza aggiungere offset fissi.

La risposta conserva `data`, `key` e `query.date`, aggiungendo in `query`
`dateFrom`, `dateTo` (ISO UTC) e `timeZone`. Le etichette AM/PM sono ore locali
dell'impianto: `12 am` = 00:00 e `12 pm` = 12:00. Le ore senza operazioni
restano omesse; nel ritorno all'ora solare le due occorrenze della stessa ora
locale vengono sommate. `total` è ingressi + uscite, non l'occupazione.

## Verifica

Eseguire con Node.js >= 22:

```sh
node --test test/utc-history.test.js test/utc-stalls.test.js test/operations-timezone.test.js
```

I test coprono quattro fusi del server, millisecondi, anno bisestile, date dei
cambi d'ora, DATE senza segno, salvataggio e limiti delle query. MongoDB e PLC
sono simulati; il test non avvia connessioni all'impianto.
