import React from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.scss';

function OfferCard({ title, description, icon }) {
    return (
        <div className="offer-card card">
            <div className="card-body">
                {/* Piktogram na górze */}
                <img src={icon} alt={`${title} icon`} className="offer-card-icon" />
                {/* Tytuł karty */}
                <h3 className="card-title">{title}</h3>
                {/* Tekst pod tytułem */}
                <p className="card-text">{description}</p>
                {/* Przycisk przenoszący do podstrony "Usługi" */}
                <Link to="/rezerwacja#Oferta" className="btn btn-warning mt-3">
                    Sprawdź
                </Link>
            </div>
        </div>
    );
}

export default OfferCard;
