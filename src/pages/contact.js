import React, { useState, useEffect } from 'react';
import { Accordion, Container, Button, Modal, Form, Row, Col,  } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import './ContactPage.scss';

const ContactPage = () => {
    const [reviews, setReviews] = useState([]); // Stan na recenzje
    const [showModal, setShowModal] = useState(false); // Stan na pop-up formularza
    const [newReview, setNewReview] = useState({ name: '', carMake: '', carModel: '', reviewText: '', rating: 0 }); // Dane nowej recenzji

    // Pobierz recenzje z serwera
    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reviews');
            setReviews(response.data); // Ustaw dane w stanie
        } catch (error) {
            console.error('Błąd podczas pobierania recenzji:', error);
        }
    };

    // useEffect do pobierania recenzji po załadowaniu komponentu
    useEffect(() => {
        fetchReviews();
    }, []);

    // Obsługa zmiany w formularzu
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    // Obsługa zmiany gwiazdek
    const handleStarChange = (newRating) => {
        setNewReview({ ...newReview, rating: newRating });
    };

    // Obsługa przesłania recenzji
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/reviews', newReview); // Wyślij dane na serwer
            setShowModal(false); // Zamknij modal
            setNewReview({ name: '', carMake: '', carModel: '', reviewText: '', rating: 0 }); // Wyczyść formularz
            fetchReviews(); // Odśwież recenzje
        } catch (error) {
            console.error('Błąd podczas dodawania recenzji:', error);
        }
    };
    return (
        <div className="contact-page">
            <div className="faq-section">
                <Container>
                    <h2 className="faq-title pt-5">FAQ</h2>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Czym jest CLEANDAWHEELS?</Accordion.Header>
                            <Accordion.Body>
                                CLEANDAWHEELS to firma zajmująca się profesjonalnym auto detailingiem, oferująca szeroki zakres usług od pielęgnacji wnętrza po ochronę lakieru.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Do kogo kierujemy usługi?</Accordion.Header>
                            <Accordion.Body>
                                Nasze usługi są skierowane zarówno do właścicieli samochodów osobowych, jak i luksusowych pojazdów, którzy chcą zadbać o wygląd i ochronę swoich aut.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Czym jest auto detailing?</Accordion.Header>
                            <Accordion.Body>
                                Auto detailing to proces kompleksowego czyszczenia, renowacji i ochrony pojazdu, który pozwala przywrócić mu wygląd jak z salonu.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Dlaczego warto wybrać nasze usługi?</Accordion.Header>
                            <Accordion.Body>
                                Wyróżniamy się profesjonalizmem, wysoką jakością produktów oraz indywidualnym podejściem do każdego klienta, co gwarantuje satysfakcję z naszych usług.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
    {/* Sekcja recenzji */}
    <div className="reviews-section">
                <Container>
                    <h2 className="reviews-title pt-5">Recenzje naszych klientów</h2>
                    <div className="reviews-carousel">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <h5>{review.name}</h5>
                                <p>
                                    {review.carMake} {review.carModel}
                                </p>
                                <p>{review.reviewText}</p>
                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                    color="#dcdcdc"
                                />
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="warning"
                        className="mt-4"
                        onClick={() => setShowModal(true)} // Otwórz modal
                    >
                        Dodaj recenzję
                    </Button>
                </Container>
    </div>

            {/* Modal z formularzem */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj recenzję</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Imię</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newReview.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Marka samochodu</Form.Label>
                            <Form.Control
                                type="text"
                                name="carMake"
                                value={newReview.carMake}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Model samochodu</Form.Label>
                            <Form.Control
                                type="text"
                                name="carModel"
                                value={newReview.carModel}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Treść recenzji</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="reviewText"
                                value={newReview.reviewText}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ocena</Form.Label>
                            <ReactStars
                                count={5}
                                value={newReview.rating}
                                onChange={handleStarChange}
                                size={24}
                                activeColor="#ffd700"
                                color="#dcdcdc"
                            />
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            Dodaj
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <div className="contact-section pt-5">
                <Container>
                    <h2 className="contact-title">Kontakt</h2>
                    <Row>
                    <Col md={6}>
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="bi bi-geo-alt"></i>
                                <p>Ul. Wiejska 4/6/8<br />00-902 Warszawa</p>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-telephone"></i>
                                <p>+48 501 118 105</p>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-envelope"></i>
                                <p>CleanDaWheel@gmail.com</p>
                            </div>
                            <div className="contact-item">
                                <i className="bi bi-clock"></i>
                                <p>Godziny otwarcia:<br />Pon-Czw: 9-21<br />Pt: 9-19<br />Sob: 9-15<br />Ndz: zamknięte</p>
                            </div>
                        </div>
                    </Col>

                        <Col md={6}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2149.166234643808!2d18.6536!3d54.3486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIwJzU0LjgiTiAxOMKwMzknMTQuOCJF!5e0!3m2!1spl!2spl!4v1699098569765"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Mapa lokalizacji"
                            ></iframe>
                        </Col>
                    </Row>
                </Container>
            </div>
            
        </div>
    );
};

export default ContactPage;
