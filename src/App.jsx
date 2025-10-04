import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Scheduling from "./pages/Scheduling";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function App() {
  // A lógica de cores agora vive aqui, no componente pai.
  const pastelColors = ['#FFF0F5', '#E6E6FA', '#F0F8FF', '#F5FFFA'];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % pastelColors.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearTimeout(timer);
  }, [colorIndex]);

  const currentColor = pastelColors[colorIndex];

  return (
    <ThemeProvider>
      <Router>
        {/* O fundo dinâmico é aplicado aqui para cobrir toda a tela */}
        <div
          style={{ backgroundColor: currentColor }}
          className="flex flex-col min-h-screen transition-colors duration-1000 ease-in-out"
        >
          {/* Passamos a cor atual como uma propriedade para o Navbar */}
          <Navbar currentBgColor={currentColor} />
          <main className="flex-grow">
            <Routes>
              {/* E também para a Home, para que ela não precise ter sua própria lógica de cor */}
              <Route path="/" element={<Home currentBgColor={currentColor} />} />
              <Route path="/agendamento" element={<Scheduling />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}