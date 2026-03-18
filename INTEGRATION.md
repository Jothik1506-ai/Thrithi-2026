Google Sheets connection steps

1. Create a new Google Sheet and name the first sheet `Registrations`.
2. Open `Extensions -> Apps Script`.
3. Replace the default code with the contents of [google-apps-script.gs](C:\D drive\Git connect thrithi\google-apps-script.gs).
4. Click `Deploy -> New deployment`.
5. Select `Web app`.
6. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Click `Deploy` and copy the Web App URL.
8. Open [scripts.js](C:\D drive\Git connect thrithi\scripts.js) and replace:

```js
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your deployed Web App URL.
9. Save `scripts.js` and test the form.

Data sent from the form

- Full Name
- Mobile Number
- Email ID
- Institution Name
- Event Name
- Amount

Notes

- Timestamp is added automatically inside Google Sheets.
- Multiple selected events are stored in one cell as a comma-separated list.
- File uploads are not sent anywhere.
- After submit, the form shows a simple success alert only.
