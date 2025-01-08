import React from 'react';
import './Footer.scss';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer text-white py-3 mt-5">
            <div className="container d-flex justify-content-between align-items-center">
                <p>&copy; CleanDaWheels - wszystkie prawa zastrzeżone</p>
                
                <a href="#" className="terms-link">Terms of use</a>

                <div className="footer-contact">
                    <address className="footer-address">
                        Adres: Ul. Wiejska 4/6/8, 00-902 Warszawa
                    </address>
                    <p className="footer-phone">Telefon: <a href="tel:#">+48 123 456 789</a></p>
                </div>

                <div className="social-icons">
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FaTiktok />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
