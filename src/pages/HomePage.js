import React from 'react';
import OfferCard from '../components/OfferCard';
import Gallery from '../components/Gallery';
import './HomePage.scss';
import Best from '../img/Best.png';
function HomePage() {
    return (
        <>
            <header className="hero d-flex align-items-center justify-content-center text-center text-white">
                <h1>AutoDetailing - Profesjonalna pielęgnacja aut</h1>
            </header>
            <section className='py-5 aboutDetailing'>
                <div className='container'>
                    <h2 className='text-center mb-4 magra-bold'>Czym jest AutoDetailing?</h2>
                    <div className='row'>
                        <div className='col-md-6 px-5'>
                            <p className=' px-5 py-3'>Auto detailing, to efektywna pielęgnacja auta, która sprawi, że samochód będzie wyglądał tak, jakby właśnie wyjechał z salonu.
                                                    <br />
                                                    <br />
                                                    W naszej ofercie posiadamy między innymi takie działania jak korekta lakieru, polerowanie reflektorów, pranie tapicerki, zabezpieczanie felg czy zabezpieczenie szyb oraz wnętrza samochodu. 
                                                    W auto detailingu przykładamy dużą wagę do renowacji i późniejszej ochrony lakieru pojazdu.</p>
                        </div>
                        <div className='col-md-6 px-5'>
                            <p className=' px-5 py-3'>
                                Nakładamy najlepsze i najtwardsze dostępne na rynku, powłoki tytanowe i ceramiczne, na które wystawiamy gwarancję na zabezpieczone powierzchnie samochodu. 
                                W ramach auto detailingu nakładamy na lakier specjalne woski samochodowe, które nadadzą lakierowi gładkość i uwydatnią jego kolor.
                                U nas każdy pojazd traktowany jest indywidualnie i z wyjątkową precyzją by osiągnąć jak najlepszy efekt.
                            </p> 
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <div className='container'>
                    <h2 className='text-center mb-4 magra-bold'>Kim jesteśmy?</h2>
                    <div className='row'>
                        <div className='col-md-6 px-5'>
                            <p className=' px-5 py-3'>CleanDaWheels  to firma z wieloletnią tradycją dbania o samochody klientów. Do każdego samochodu klienta podchodzimy  indywidualnie z najwyższą starannością i precyzją.Nasza firma korzysta tylko z najwyższej jakości produktów.</p>
                        </div>
                        <div className='col-md-6 text-center column'>
                            <img src={Best} alt="" className='Best pb-3'/>
                            <p className='magra-bold'>Jesteśmy najlepsi w Polsce!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="offer-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4 magra-bold">Nasza oferta</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <OfferCard 
                                title="Pielęgnacja całego auta" 
                                description="Usługa pielęgnacji całego auta to kompleksowe czyszczenie i konserwacja pojazdu, w tym m.in.: mycie karoserii, felg i szyb, czyszczenie wnętrza samochodu, usuwanie zabrudzeń z tapicerki, pielęgnacja skórzanych elementów, woskowanie karoserii, polerowanie lakieru oraz aplikacja środków zabezpieczających przed szkodliwymi czynnikami zewnętrznymi."
                                icon={require('../img/piktogramy/carwash.png')}
                            />
                        </div>
                        <div className="col-md-3">
                            <OfferCard 
                                title="Odnawianie plastików" 
                                description="Usługa odnawiania plastików w aucie polega na przywracaniu pierwotnego wyglądu elementów z tworzyw sztucznych znajdujących się wewnątrz lub na zewnątrz pojazdu. W ramach tej usługi usuwa się zmatowienia, rysy oraz inne uszkodzenia powierzchni plastikowych."
                                icon={require('../img/piktogramy/torch.png')}
                            />
                        </div>
                        <div className="col-md-3">
                            <OfferCard 
                                title="Woskowanie" 
                                description="Usługa woskowania auta to proces aplikacji specjalnego preparatu na powierzchnię karoserii pojazdu, który ma za zadanie zabezpieczyć lakier przed szkodliwym wpływem czynników atmosferycznych i mechanicznych. Woskowanie chroni powierzchnię auta przed uszkodzeniami mechanicznymi"
                                icon={require('../img/piktogramy/clean.png')}
                            />
                        </div>
                        <div className="col-md-3">
                            <OfferCard 
                                title="Oklejanie auta" 
                                description="Usługa oklejania auta to proces naklejania folii na powierzchnię karoserii pojazdu w celu zmiany jego wyglądu lub reklamowania produktów lub usług."
                                icon={require('../img/piktogramy/oklejanie.png')}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="gallery-section py-5">
                <h2 className="text-center mb-4 magra-bold">Nasze realizacje</h2>
                <Gallery />
            </section>
        </>
    );
}

export default HomePage;