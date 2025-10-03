import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// Importaremos as outras páginas aqui no futuro (Agendamento, Tratamentos, etc.)

function App() {
  return (
    <Router>
      {/* O Navbar pode ser adicionado aqui se for global */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* As rotas para as outras páginas virão aqui */}
      </Routes>
      {/* O Footer pode ser adicionado aqui se for global */}
    </Router>
  );
}

export default App;