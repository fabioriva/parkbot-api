# Alarm emails

`MailingList.sendMail(aps, doc)` sends alarm-entry events (`doc.operation.id === 1`)
through `@sendgrid/mail`. The document is the enriched result of
`History.saveLog`, including `alarm`, `device` and `date`.

Set these environment variables before sending:

```dotenv
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_SENDER=your-verified-sender@example.com
```

The sender must be verified in SendGrid. `MAIL_PROVIDER` is no longer used.
Recipient documents in `mailingList` use `status: true`, `email`, and optionally
`locale: "it"` or `locale: "en"`. Missing or unsupported locales use English.
Recipients receive separate emails, even when grouped by language.
Dates are formatted in the recipient's language and explicitly displayed in UTC.
Delivery errors reject the returned promise; callers must await or catch it.

```js
await mailingList.sendMail(def.APS, doc)
```

The existing commented notification hooks in the PLC entry points remain
inactive. Wire this call into the desired alarm handler to enable automatic
sending, catching delivery errors separately from PLC processing.

## Translations

`messages/en.json` and `messages/it.json` contain alarm descriptions initially
copied from the local `parkbot-app` catalog, plus email subject/body messages.
These are snapshots: changes in the frontend are not automatically synchronized.
The English fallback key was normalized to `alarm.al-fallback`.
Keep shared alarm keys and parameters aligned when editing either repository.

Run `npm run i18n:compile` after changing translations. Generated modules live
in `lib/paraglide` and are ignored by Git. Compilation also runs before
`npm run api`, `npm run dev`, `npm start`, and `npm test`.

For production deployments that omit dev dependencies, compile with dev
dependencies installed first and include `lib/paraglide` in the artifact;
then launch the Node/PM2 entry point directly, since `npm start` recompiles.
The compiler downloads its configured inlang plugin on an uncached build.

Run `npm run test:notifications` to verify rendering and SendGrid payloads
with a mocked HTTP client. No real emails are sent by these tests.
