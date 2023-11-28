import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import ChatBox from './components/Floating-Button';
import About from './pages/About';
import Nofound from './pages/Nofound';
import Contact from './pages/Contact';
import Albums from './pages/Albums';
import Reviews from './pages/Reviews';
import Admin from './pages/Admin';
import Images from './pages/Albums/Images';


function App() {
  return (
    <>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/about-me" element={<About />} />
    <Route exact path="/contact-me" element={<Contact />} />
    <Route exact path="/albums" element={<Albums />} />
    <Route exact path="/reviews" element={<Reviews />} />
    <Route exact path="/admin" element={<Admin />} />
    <Route exact path="/our-gallery/images/:id" element={<Images />} />
    <Route exact path="*" element={<Nofound />} />
    </Routes>
    <ChatBox phoneNumber="+61414973850"/>
    </>
  );
}

export default App;
