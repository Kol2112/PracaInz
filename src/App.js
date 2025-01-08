import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Offer from './pages/Offer';
import Footer from './components/Footer';
import ContactPage from './pages/contact';
function App() {
  return (
      <Router>
          <CustomNavbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rezerwacja" element={<Offer />} />
              <Route path="/rezerwacja#Oferta" element={<Offer />} />
              <Route path="/kontakt" element={<ContactPage />} />
          </Routes>
          <Footer />
      </Router>
  );
}

export default App;
