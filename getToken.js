const express = require('express');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    '906605502476-8uh3vdi79enldni421etfkdedve92u14.apps.googleusercontent.com',
    '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',
    'http://localhost:3000'
);

const app = express();

app.get('/', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        res.send('Brak kodu autoryzacyjnego');
        return;
    }

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.send(`Twój Refresh Token to: ${tokens.refresh_token}`);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
    } catch (err) {
        console.error('Błąd przy pobieraniu tokenu:', err);
        res.status(500).send('Błąd podczas pobierania tokenu');
    }
});

app.listen(3000, () => {
    console.log('Serwer działa na http://localhost:3000');
    const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: ['https://www.googleapis.com/auth/calendar'] });
    console.log('Wejdź na link, aby się zalogować:', authUrl);
});
