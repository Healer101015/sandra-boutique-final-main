import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'; // Supondo que o logo está em assets

// --- Componentes Reutilizáveis ---

// Botão com o degradê vibrante
const GradientButton = ({ children, className }) => (
  <button
    className={`px-8 py-3 font-bold text-white rounded-full transition-transform transform hover:scale-105 shadow-lg bg-vibrant-gradient ${className}`}
  >
    {children}
  </button>
);

// Card para Tratamentos ou Posts do Blog (estilo Apple)
const FeatureCard = ({ title, description, imageUrl }) => (
  <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden text-center transform transition-all duration-500 hover:scale-105 hover:shadow-brand-purple/20">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-brand-gold">{title}</h3>
      <p className="mt-2 text-brand-gray">{description}</p>
    </div>
  </div>
);

// --- Seções da Página ---

// Seção Principal (Hero)
const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center text-center bg-gray-50 relative overflow-hidden">
    {/* Fundo com degradê circular abstrato */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-brand-pink/20 via-brand-purple/20 to-brand-yellow/20 rounded-full animate-pulse"></div>
    </div>
    <div className="relative z-10 p-6">
      <div className="inline-block p-1 bg-vibrant-gradient rounded-full mb-6">
        <img src={logo} alt="Pele Brasileira Logo" className="h-32 w-32 rounded-full" />
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-brand-gold tracking-tight">
        Pele Brasileira
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-gray">
        Excelência em estética clínica e nutracêuticos. Beleza, ciência e cuidado em perfeita harmonia.
      </p>
      <div className="mt-8">
        <GradientButton>Agende sua Consulta</GradientButton>
      </div>
    </div>
  </section>
);

// Seção de Feed do Instagram
const InstagramFeedSection = () => {
  const [feed, setFeed] = useState([]);
  // Lembre-se de usar um serviço como Juicer.io ou Curator.io para obter uma API real
  const MOCK_API_URL = "URL_DA_SUA_API_DE_FEED_AQUI"; // Substitua!

  // Mock de dados para design sem API
  useEffect(() => {
    const mockFeed = [
      { id: 1, image: 'https://via.placeholder.com/400x400.png/CBA14B/FFFFFF?text=Post+1', url: '#' },
      { id: 2, image: 'https://via.placeholder.com/400x400.png/8A3FFC/FFFFFF?text=Post+2', url: '#' },
      { id: 3, image: 'https://via.placeholder.com/400x400.png/FF5A9B/FFFFFF?text=Post+3', url: '#' },
      { id: 4, image: 'https://via.placeholder.com/400x400.png/FF8A00/FFFFFF?text=Post+4', url: '#' },
    ];
    setFeed(mockFeed);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-brand-gold mb-2">Construindo Autoridade</h2>
        <p className="text-brand-gray mb-12">Veja os resultados e novidades em nosso Instagram.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {feed.map(post => (
            <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
              <img src={post.image} alt="Instagram Post" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Componente Principal da Página Home ---

export default function Home() {
  return (
    <div className="font-sans">
      <HeroSection />

      {/* Seção de Tratamentos/Serviços */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-brand-gold mb-12">Nossos Tratamentos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Tratamentos Clínicos" description="Protocolos avançados para uma pele saudável e radiante." imageUrl="https://via.placeholder.com/600x400.png/CBA14B/FFFFFF?text=Clínico" />
            <FeatureCard title="Nutracêuticos" description="A beleza que vem de dentro, com suplementação inteligente." imageUrl="https://via.placeholder.com/600x400.png/8A3FFC/FFFFFF?text=Nutra" />
            <FeatureCard title="Consultoria de Emergência" description="Atendimento rápido e orientação para cuidados imediatos." imageUrl="https://via.placeholder.com/600x400.png/FF5A9B/FFFFFF?text=Emergência" />
          </div>
        </div>
      </section>

      <InstagramFeedSection />

      {/* Adicionar aqui outras seções: Blog/Conteúdo, Contato, etc. */}

      <footer className="text-center py-8 bg-white">
        <p className="text-brand-gray">&copy; {new Date().getFullYear()} Pele Brasileira. Design & Funcionalidade com excelência.</p>
      </footer>
    </div>
  );
}