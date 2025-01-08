import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navbar.scss';
import logo from '../img/logo.png';

function CustomNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); // Hook do sprawdzenia obecnej ścieżki

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sprawdzenie, czy jesteśmy na stronie głównej
    const isHomePage = location.pathname === '/';

    return (
        <Navbar
            expand="lg"
            sticky="top"
            className={`custom-navbar ${scrolled || !isHomePage ? 'scrolled' : ''}`}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="nav-link">
                            Strona Główna
                        </Nav.Link>
                        <NavDropdown title="Usługi" id="services-dropdown" className="nav-link">
                            <NavDropdown.Item as={NavLink} to="/rezerwacja#reservation">
                                Rezerwacja
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/rezerwacja#Oferta">
                                Oferta
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/kontakt" className="nav-link">
                            Kontakt
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
