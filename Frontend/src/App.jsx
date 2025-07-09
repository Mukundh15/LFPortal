import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Product from './pages/Product';
import AboutOwner from './pages/AboutOwner';
import CardsInfo from './pages/CardsInfo';
import Feedback from './pages/Feedback';
function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Owner" element={<AboutOwner />} />
        <Route path="/ReportProduct" element={<Product/>} />
        <Route path="/Support" element={<Support />} />
        <Route path="/CardInfo" element={<CardsInfo />} />
        <Route path="/Feedback" element={<Feedback />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
