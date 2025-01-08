import React, { useState } from 'react'; //import frameworku react
import Modal from 'react-modal'; //import modalu
import ReactCompareImage from 'react-compare-image'; //import modułu react odpowiadającego za możliwość efektu przed i po
import './Gallery.scss';  //import stylów
import img1 from '../img/Clean206.png';  // Zdjęcie „przed”
import img2 from '../img/dirty206.png';  // Zdjęcie „po”
Modal.setAppElement('#root');  // Ustawienie elementu dla modala

function Gallery() {
    // Tablica obiektów „przed i po”
    // klucz before jest zdjęciem podglądowym na stronie głównej, gdy nie ma włączonego modalu
    // klucz after jest zdjęciem pojawiającym się dopiero po otworzeniu modalu z prawej strony elementu
    const images = [
        { before: img2, after: img1 },
        { before: img2, after: img1 },
        { before: img2, after: img1 },
        { before: img1, after: img2 },
        { before: img2, after: img1 },
        { before: img2, after: img1 },
        { before: img2, after: img1 },
        { before: img2, after: img1 },
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Funkcja otwierająca modal i ustawiająca wybrany obraz
    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    // Funkcja zamykająca modal
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="gallery container">
            <div className="row">
                {images.map((img, idx) => (
                    <div key={idx} className="col-md-3 gallery-item mb-4">
                        <img
                            src={img.before}
                            alt={`Gallery ${idx + 1}`}
                            className="img-fluid rounded"
                            onClick={() => openModal(img)} // Ustawienie kliknięcia na otwarcie modala
                        />
                    </div>
                ))}
            </div>

            {/* Modal z efektem przed i po */}
            <Modal
                isOpen={modalIsOpen} //sprawdza stan modalu
                onRequestClose={closeModal} //zamyka modal
                contentLabel="Image Modal"
                //Przypisanie stylów
                className="image-modal"
                overlayClassName="overlay"
            >

                {/* Sprawdzenie, czy wybrany obraz jest ustawiony */}
                {selectedImage ? (
                    <ReactCompareImage  //generowanie modalu
                        leftImage={selectedImage.before}
                        rightImage={selectedImage.after}
                        sliderLineWidth={2}
                        sliderPositionPercentage={0.5}
                    />
                ) : (
                    <p>Loading image...</p> // Placeholder, gdyby obrazy się nie ładowały
                )}
                <button onClick={closeModal} className="close-modal"> {/* Przycisk zamykający modal */}
                    &times; 
                </button>
            </Modal>
        </div>
    );
}

export default Gallery;
