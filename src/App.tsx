import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RemoteWork from "./pages/RemoteWork";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import PartnersSection from "./components/PartnersSection";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="font-sans antialiased">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/remote-work" element={<RemoteWork />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <PartnersSection />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
