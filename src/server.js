const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importuj cors
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config({ path: './mongo.env' });

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Zezwalaj na CORS
app.use(bodyParser.json());

// Połączenie z MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd połączenia z MongoDB:', err));
// Schemat rezerwacji
const ReservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    googleEventId: { type: String },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', ReservationSchema);

// Konfiguracja Google Calendar
const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// Endpoint: Dodawanie rezerwacji
app.post('/api/reservations', async (req, res) => {
    try {
        const { name, email, carMake, carModel, day, time } = req.body;

        // Sprawdzenie, czy rezerwacja już istnieje
        const existingReservation = await Reservation.findOne({ day, time });
        if (existingReservation) {
            return res.status(400).json({ error: 'Rezerwacja na ten termin już istnieje.' });
        }

        // Tworzenie wydarzenia w Google Calendar
        const startDateTime = `${day}T${time}:00`;
        const endHour = parseInt(time.split(':')[0], 10) + 1;
        const endDateTime = `${day}T${endHour.toString().padStart(2, '0')}:${time.split(':')[1]}:00`;

        const event = {
            summary: `Rezerwacja: ${name}`,
            description: `Marka: ${carMake}, Model: ${carModel}`,
            start: { dateTime: startDateTime, timeZone: 'Europe/Warsaw' },
            end: { dateTime: endDateTime, timeZone: 'Europe/Warsaw' },
            attendees: [{ email }],
        };

        const calendarEvent = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            resource: event,
        });

        // Zapisanie rezerwacji w MongoDB
        const reservation = new Reservation({
            name,
            email,
            carMake,
            carModel,
            day,
            time,
            googleEventId: calendarEvent.data.id,
        });
        const savedReservation = await reservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        console.error('Błąd podczas tworzenia rezerwacji:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Schemat recenzji
const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true }, // Ocena w skali 1-5
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

// Endpoint do pobierania recenzji
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }); // Sortuj od najnowszych
        res.json(reviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint do dodawania recenzji
app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`));
