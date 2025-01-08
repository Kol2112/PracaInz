import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import './Offer.scss';
import PCA from '../img/PCA.png';
import OP from '../img/OP.png';
import Okleina from'../img/Oklejanie.png';
import Woskowanie from '../img/Wosk.png';

function Offer() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        carMake: '',
        carModel: '',
        day: '',
        time: '',
    });

    const [weekDays, setWeekDays] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const [currentMonth, setCurrentMonth] = useState('');
    useEffect(() => {
        const generateWeekDays = () => {
            const now = new Date();
            const monthName = format(now, 'MMMM yyyy', { locale: pl });
            setCurrentMonth(monthName.charAt(0).toUpperCase() + monthName.slice(1)); // Z dużą literą        
            const daysInWeek = [];
            const dayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
        
            for (let i = 0; i < 7; i++) {
                const day = new Date(now);  
                day.setDate(now.getDate() + i + weekOffset * 7);
                daysInWeek.push({
                    dayName: dayNames[day.getDay()],
                    dayNumber: day.getDate(),
                    fullDate: day.toISOString().split('T')[0],
                });
            }
            return daysInWeek;
        };

        const handleHashChange = () => {
            if (window.location.hash) {
                const targetId = window.location.hash.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
    
        window.addEventListener('hashchange', handleHashChange);
    
        // Uruchamia na początkowe załadowanie strony
        handleHashChange();
        setWeekDays(generateWeekDays());
    
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };


    }, [weekOffset]);

    const handleDaySelection = (index) => {
        setSelectedDay(weekDays[index]);
        setFormData((prev) => ({
            ...prev,
            day: weekDays[index].fullDate,
        }));
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
        setFormData((prev) => ({
            ...prev,
            time: time,
        }));
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.day || !formData.time) {
            alert('Proszę wybrać datę i godzinę.');
            return;
        }

        console.log('Wysyłane dane:', formData);

        try {
            const response = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Rezerwacja dodana!');
                setFormData({
                    name: '',
                    email: '',
                    carMake: '',
                    carModel: '',
                    day: '',
                    time: '',
                });
                setSelectedDay(null);
                setSelectedTime(null);
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Błąd:', errorData.error);
                alert(`Błąd: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Błąd:', error);
            alert('Coś poszło nie tak.');
        }
    };

    const handleWeekChange = (direction) => {
        setWeekOffset(weekOffset + direction);
    };

    const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];


    return (
        <div className="offer-page container" id="reservation">
        <h1 className="text-center">Rezerwacja Terminu</h1>
        <div className="calendar">
            <div className="week-navigation">
                <button onClick={() => handleWeekChange(-1)} className="btn btn-primary">
                    Poprzedni tydzień
                </button>
                <button onClick={() => handleWeekChange(1)} className="btn btn-primary">
                    Następny tydzień
                </button>
            </div>
            <h3 className="text-center">{currentMonth}</h3> {/* Nagłówek */}
            <div className="days">
                {weekDays.map((day, index) => (
                    <button
                        key={index}
                        className={`day-button ${selectedDay?.dayNumber === day.dayNumber ? 'selected' : ''}`}
                        onClick={() => handleDaySelection(index)}
                    >
                        {day.dayName}
                        <br />
                        {day.dayNumber}
                    </button>
                ))}
            </div>

            <div className="times">
                {times.map((time, index) => (
                    <button
                        key={index}
                        className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeClick(time)}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={() => setIsModalOpen(false)}>
                        &times;
                    </button>
                    <form onSubmit={handleSubmit} className="reservation-form">
                        <h2>Formularz Rezerwacji</h2>
                        <div className="form-group">
                            <label htmlFor="name">Imię</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="carMake">Marka samochodu</label>
                            <input
                                type="text"
                                id="carMake"
                                name="carMake"
                                value={formData.carMake}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="carModel">Model samochodu</label>
                            <input
                                type="text"
                                id="carModel"
                                name="carModel"
                                value={formData.carModel}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Zarezerwuj
                        </button>
                    </form>
                </div>
            </div>
        )}
        {/* <div className='container'> */}
        <h1 className="text-center">Oferta</h1>
            {/* Sekcja kafelków */}
            <div className="offer-tiles row">
                <div className="col-md-6 mb-2">
                    <div className="tile ">
                        <img src={PCA} alt="Pielęgnacja auta" />
                        <div className='tile_content'>
                            <h3>Pielęgnacja całego auta</h3>
                            <p>Usługa pielęgnacji całego auta to kompleksowe czyszczenie i konserwacja pojazdu, w tym m.in.: mycie karoserii, felg i szyb, 
                                czyszczenie wnętrza samochodu, usuwanie zabrudzeń z tapicerki, pielęgnacja skórzanych elementów, woskowanie karoserii, 
                                polerowanie lakieru oraz aplikacja środków zabezpieczających przed szkodliwymi czynnikami zewnętrznymi. 
                                Celem tej usługi jest nie tylko poprawa estetyki auta, 
                                ale także utrzymanie jego stanu technicznego i zabezpieczenie przed szkodliwymi czynnikami zewnętrznymi, 
                                takimi jak np. korozja czy utrata koloru lakieru.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="tile">
                        <img src={OP} alt="Odnawianie plastików" />
                        <div className='tile_content'>
                            <h3>Odnawianie plastików</h3>
                            <p>Usługa odnawiania plastików w aucie polega na przywracaniu pierwotnego wyglądu elementów z tworzyw sztucznych znajdujących się 
                                wewnątrz lub na zewnątrz pojazdu. W ramach tej usługi usuwa się zmatowienia, rysy oraz inne uszkodzenia powierzchni plastikowych, 
                                a następnie nanosi się specjalne środki, które przywracają im połysk i intensywność koloru. Dzięki temu, że elementy te wyglądają jak nowe, 
                                całe auto zyskuje na estetyce, a jednocześnie zwiększa się ich trwałość i odporność na działanie szkodliwych czynników zewnętrznych, 
                                takich jak słońce, woda czy chemikalia.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="tile ">
                        <img src={Woskowanie} alt="Woskowanie" />
                        <div className='tile_content'>
                            <h3>Woskowanie</h3>
                            <p>Usługa woskowania auta to proces aplikacji specjalnego preparatu na powierzchnię karoserii pojazdu, 
                                który ma za zadanie zabezpieczyć lakier przed szkodliwym wpływem czynników atmosferycznych i mechanicznych. 
                                Woskowanie chroni powierzchnię auta przed uszkodzeniami mechanicznymi, takimi jak zarysowania, a także przed szkodliwym działaniem promieniowania UV, 
                                zanieczyszczeń, czy korozji. Woskowanie powinno być wykonywane regularnie, co kilka miesięcy, 
                                aby zapewnić maksymalną ochronę i zachować doskonały wygląd auta.</p>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="tile ">
                        <img src={Okleina} alt="Oklejanie" />
                        <div className='tile_content'>
                            <h3>Oklejanie</h3>
                            <p>Folia oklejająca może mieć różne kolory, wzory i tekstury, a także zawierać drukowane grafiki i napisy. 
                                Oklejanie auta jest popularne wśród firm, które chcą w atrakcyjny sposób zareklamować swoją działalność, 
                                a także wśród prywatnych właścicieli samochodów, którzy chcą nadać swojemu pojazdowi oryginalny wygląd. 
                                Folia oklejająca chroni również powierzchnię auta przed zarysowaniami i innymi uszkodzeniami mechanicznymi. </p>
                        </div>
                   </div>
                </div>
            </div>
        {/* </div> */}
       

            {/* Sekcja tabel */}
            <div className="price-tables" id="Oferta">
                <h2>Ochrona lakieru</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Aplikacja wosku twardego</th>
                            <th>Małe auto</th>
                            <th>Średnie auto</th>
                            <th>Duże auto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wosk twardy</td>
                            <td>od 300 zł</td>
                            <td>od 350 zł</td>
                            <td>od 400 zł</td>
                        </tr>
                        <tr>
                            <td>One step - wosk</td>
                            <td>od 340 zł</td>
                            <td>od 420 zł</td>
                            <td>od 570 zł</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Folie ochronne</th>
                            <th></th>
                            <th>Wszystkie auta</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Reflektory przednie</td>
                            <td></td>
                            <td>od 270zł</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Reflektory tylnie</td>
                            <td></td>
                            <td>od 270zł</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Szyby</td>
                            <td></td>
                            <td>od 270zł</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Lusterka</td>
                            <td></td>
                            <td>od 270zł</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Wnęki klamek</td>
                            <td></td>
                            <td>od 270zł</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Całe auto</td>
                            <td></td>
                            <td>Wycena indywidualna</td>
                            <td></td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Powłoka ceramiczna</th>
                            <th>Małe auto</th>
                            <th>Średnie auto</th>
                            <th>Duże auto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Powłoka HYDROFOBOWA<br/>(trwałość 6-9 miesięcy):</td>
                            <td>od 430zł</td>
                            <td>od 700zł</td>
                            <td>od 900zł</td>
                        </tr>
                        <tr>
                            <td>Powłoka BASIC COATING<br/>(trwałość 18 miesięcy):</td>
                            <td>od 1100zl</td>
                            <td>od 1400zł</td>
                            <td>od 1700zł</td>
                        </tr>
                        <tr>
                            <td>Powłoka TITANIUM SELF HEALING<br/>(trwałość 4 lata):</td>
                            <td>od 2400zł</td>
                            <td>od 2800zł</td>
                            <td>od 3100zł</td>
                        </tr>
                        <tr>
                            <td>Powłoka TITANIUM COATING 9H<br/>(trwałość 5 lat):</td>
                            <td>od 3000zł</td>
                            <td>od 3300zł</td>
                            <td>od 3700zł</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Zabezpieczenie felg</th>
                            <th>Małe auto</th>
                            <th>Średnie auto</th>
                            <th>Duże auto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Powłoka ceramiczna na felgi</td>
                            <td>od 200zł</td>
                            <td>od 300zł</td>
                            <td>od 400zł</td>
                        </tr>
                    </tbody>
                </table>
                {/* Kolejne tabele */}
                <h2>Regeneracja lakieru</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Regeneracja lakieru</th>
                            <th>Małe auto</th>
                            <th>Średnie auto</th>
                            <th>Duże auto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>One step - jednoetapowe polerowanie lakieru</td>
                            <td>od 700 zł</td>
                            <td>od 1000 zł</td>
                            <td>od 1300 zł</td>
                        </tr>
                        <tr>
                            <td>Odświeżenie lakieru - dwuetapowe <br/>polerowanie lakieru</td>
                            <td>od 1200 zł</td>
                            <td>od 1500 zł</td>
                            <td>od 1800 zł</td>
                        </tr>
                        <tr>
                            <td>Pełna korekta lakieru - wieloetapowe <br/>polerowanie lakieru</td>
                            <td>od 1600 zł</td>
                            <td>od 1900 zł</td>
                            <td>od 2200 zł</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        
    );
}

export default Offer;
