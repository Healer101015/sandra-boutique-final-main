import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

// --- DADOS CENTRALIZADOS (MELHORIA 1 + NOVOS DADOS) ---
const TREATMENTS_DATA = [
  { id: 'clinicos', title: "Tratamentos Clínicos", description: "Protocolos avançados para uma pele saudável e radiante.", imageUrl: "https://media.discordapp.net/attachments/1423790051229306990/1423793203814990026/497368707_17910114516134456_7930250196043028740_n..jpg?ex=68e19a40&is=68e048c0&hm=6f26ad1a7b618cc25f473c77a061e32c84661081e32dc24a273dd67fcc739e61&=&format=webp", details: "Oferecemos uma gama completa de tratamentos clínicos, incluindo peelings químicos, microagulhamento e limpeza de pele profunda. Cada tratamento é personalizado para atender às necessidades específicas da sua pele, visando resultados duradouros e visíveis." },
  { id: 'nutraceuticos', title: "Nutracêuticos", description: "A beleza que vem de dentro, com suplementação inteligente.", imageUrl: "https://media.discordapp.net/attachments/1423790051229306990/1423793204645335134/509418327_17913989136134456_5873865744229653563_n..jpg?ex=68e19a40&is=68e048c0&hm=3fb09a337d2e81d5de661c4e3301bd6aa7a85a883883432593dcb631c0a96596&=&format=webp", details: "Nossa linha de nutracêuticos é desenvolvida com base em pesquisas científicas para fornecer os nutrientes essenciais que sua pele precisa para se regenerar e brilhar. Suplementos para colágeno, antioxidantes e vitaminas essenciais." },
  { id: 'emergencia', title: "Consultoria de Emergência", description: "Atendimento rápido e orientação para cuidados imediatos.", imageUrl: "https://media.discordapp.net/attachments/1423790051229306990/1423793205207502888/504056661_17916579798134456_8803710473495613017_n..jpg?ex=68e19a40&is=68e048c0&hm=ae132a81a1a1482c8cd47015e42399ad8a3acf5c04871664266356baeb8dc78d&=&format=webp", details: "Teve uma reação alérgica inesperada ou um problema de pele agudo? Oferecemos consultoria de emergência para avaliar a situação e fornecer orientações imediatas e seguras para aliviar o desconforto e prevenir complicações." }
];
const MOCK_INSTAGRAM_FEED = [
  { id: 1, image: 'https://media.discordapp.net/attachments/1423790051229306990/1423790190538919956/538938044_17921852025134456_675716837375455379_n..jpg?ex=68e19772&is=68e045f2&hm=e13ec6baf79192c6836e913c7e314bf412fd0338aec89bbcbb7dc6ad671cea43&=&format=webp', url: '#' },
  { id: 2, image: 'https://media.discordapp.net/attachments/1423790051229306990/1423790139540373666/541202087_17922754923134456_5909937150750818988_n..jpg?ex=68e19766&is=68e045e6&hm=0cab729c3a9a9130160a9de556a327fd567106297b6ddb5b925d1c715db4a81f&=&format=webp', url: '#' },
  { id: 3, image: 'https://media.discordapp.net/attachments/1423790051229306990/1423790064575447142/558442816_17926057620134456_5769932469641392000_n..jpg?ex=68e19754&is=68e045d4&hm=74c545ffbfa256c5d624b3a735b6408165af5b5e76fe5620518f7bc2ce06951a&=&format=webp', url: '#' },
  { id: 4, image: 'https://media.discordapp.net/attachments/1423790051229306990/1423790516893651105/534075183_17920961082134456_3231672337388259974_n..jpg?ex=68e197bf&is=68e0463f&hm=754873b3ce0a27c75673bf69a489fee99e14010004eed9aaf7ccf2df432b9996&=&format=webp', url: '#' },
];
const TESTIMONIALS_DATA = [
  { name: "Juliana S.", text: "O tratamento transformou minha pele! Me sinto muito mais confiante. Atendimento impecável e super profissional." },
  { name: "Marcos P.", text: "Nunca pensei que nutracêuticos fariam tanta diferença. Recomendo a todos que buscam resultados de dentro para fora." },
  { name: "Carla M.", text: "Tive uma reação alérgica e a consultoria de emergência foi minha salvação. Orientação rápida e eficaz!" }
];
const FAQ_DATA = [
  { q: "Qual o diferencial dos tratamentos?", a: "Nossos protocolos são 100% personalizados, utilizando tecnologia de ponta e uma abordagem que integra saúde interna e externa para resultados superiores e duradouros." },
  { q: "Os nutracêuticos são seguros?", a: "Sim, todos os nossos nutracêuticos são aprovados pela ANVISA e desenvolvidos com base em evidências científicas sólidas para garantir eficácia e segurança." },
  { q: "Como funciona o agendamento?", a: "Você pode agendar sua consulta inicial através do nosso site, WhatsApp ou telefone. Nessa consulta, avaliaremos suas necessidades e criaremos um plano de tratamento exclusivo para você." },
];

// --- HOOK PERSONALIZADO PARA ANIMAÇÃO AO ROLAR ---
const useAnimateOnScroll = (options = { threshold: 0.1, triggerOnce: true }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);
  return [ref, isVisible];
};

// --- COMPONENTES REUTILIZÁVEIS ---
const GradientButton = ({ children, to, onClick, type = 'button' }) => {
  const commonProps = {
    className: `inline-block px-8 py-3 font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg bg-rose-400 hover:bg-rose-500`
  };
  if (to) { return <Link to={to} {...commonProps}>{children}</Link>; }
  return <button type={type} onClick={onClick} {...commonProps}>{children}</button>;
};

const FeatureCard = ({ title, description, imageUrl, onCardClick }) => {
  // Usando o hook para animar a entrada do card
  const [ref, isVisible] = useAnimateOnScroll();
  return (
    <div ref={ref} onClick={onCardClick}
      className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden text-center transform transition-all duration-700 hover:scale-105 hover:shadow-rose-100 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};

// NOVO: Componente para esqueleto de carregamento
const SkeletonCard = () => (
  <div className="rounded-xl bg-gray-200 animate-pulse h-48 w-full"></div>
);

const TreatmentModal = ({ treatment, onClose }) => {
  // MELHORIA DE ACESSIBILIDADE: Fechar com a tecla 'Esc'
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!treatment) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full m-4 p-8 relative transform transition-all duration-300 scale-95 animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
        <img src={treatment.imageUrl} alt={treatment.title} className="w-full h-56 object-cover rounded-lg mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{treatment.title}</h2>
        <p className="text-gray-600">{treatment.details}</p>
        <div className="mt-6 text-right">
          <GradientButton to="/agendamento">Agendar {treatment.title}</GradientButton>
        </div>
      </div>
    </div>
  );
};

// --- SEÇÕES DA PÁGINA ---
const HeroSection = ({ onScrollClick }) => (
  <section className="min-h-[calc(100vh-80px)] flex items-center justify-center text-center p-6">
    <div className="relative z-10 flex flex-col items-center">
      {/* --- LOGO MAIOR E CENTRALIZADO --- */}
      <img src={logo} alt="Pele Brasileira Logo" className="h-48 w-48 mx-auto mb-8 rounded-full shadow-lg" />
      <div className="mt-8 space-x-4">
        <GradientButton to="/agendamento">Agende sua Consulta</GradientButton>
        <button onClick={onScrollClick} className="font-bold text-rose-500 transition-colors hover:text-rose-700">Conheça os Tratamentos &darr;</button>
      </div>
    </div>
  </section>
);

// NOVO: Componente de contador animado e seção de estatísticas
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useAnimateOnScroll({ triggerOnce: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref} className="text-5xl font-extrabold text-rose-500">{count}+</span>;
};

const StatsSection = () => (
  <section className="py-20 bg-white/50 backdrop-blur-sm">
    <div className="container mx-auto px-6 text-center">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center"><AnimatedCounter target={500} /><p className="mt-2 text-gray-600">Clientes Satisfeitos</p></div>
        <div className="flex flex-col items-center"><AnimatedCounter target={2000} /><p className="mt-2 text-gray-600">Procedimentos Realizados</p></div>
        <div className="flex flex-col items-center"><AnimatedCounter target={10} /><p className="mt-2 text-gray-600">Anos de Experiência</p></div>
      </div>
    </div>
  </section>
);

const InstagramFeedSection = () => {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFeed = () => {
      setTimeout(() => {
        // if (Math.random() > 0.5) { setError("Falha ao carregar o feed. Tente novamente."); setIsLoading(false); return; }
        setFeed(MOCK_INSTAGRAM_FEED);
        setIsLoading(false);
      }, 1500);
    };
    fetchFeed();
  }, []);

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Construindo Autoridade</h2>
        <p className="text-gray-600 mb-12">Veja os resultados e novidades em nosso Instagram.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-[192px]">
          {isLoading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {error && <p className="col-span-full text-red-500">{error}</p>}
          {!isLoading && !error && feed.map(post => (
            <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
              <img src={post.image} alt="Instagram Post" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// NOVO: Seção de Depoimentos (Prova Social)
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length), []);
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);
  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">O que Nossos Clientes Dizem</h2>
        <div className="relative overflow-hidden h-48">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-xl italic text-gray-600">"{testimonial.text}"</p>
              <p className="mt-4 font-bold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 gap-2">
          {TESTIMONIALS_DATA.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-rose-500' : 'bg-gray-300'}`}></button>
          ))}
        </div>
      </div>
    </section>
  );
};

// NOVO: Seção de Perguntas Frequentes (FAQ)
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-700">
                {faq.q}<span>{openIndex === index ? '-' : '+'}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      if (email && email.includes('@')) { setStatus('success'); setEmail(''); }
      else { setStatus('error'); }
    }, 1000);
  };
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Fique por Dentro</h2>
        <p className="text-gray-600 mb-8">Cadastre seu e-mail para receber dicas exclusivas e novidades sobre nossos tratamentos.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.email@exemplo.com" className="flex-grow px-6 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-shadow" required />
          <GradientButton type="submit">{status === 'sending' ? 'Enviando...' : 'Cadastrar'}</GradientButton>
        </form>
        {status === 'success' && <p className="mt-4 text-green-600">Obrigado! E-mail cadastrado com sucesso! ✅</p>}
        {status === 'error' && <p className="mt-4 text-red-600">Ops! Ocorreu um erro ou o e-mail é inválido. Tente novamente.</p>}
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function Home() {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const treatmentsSectionRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const handleScrollToTreatments = () => { treatmentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' }); };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showBackToTop && window.pageYOffset > 400) { setShowBackToTop(true); }
      else if (showBackToTop && window.pageYOffset <= 400) { setShowBackToTop(false); }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showBackToTop]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div>
      <HeroSection onScrollClick={handleScrollToTreatments} />
      <StatsSection />
      <section ref={treatmentsSectionRef} className="py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-2">Soluções Personalizadas para Sua Pele</h2>
          <p className="text-center text-gray-600 mb-12">Descubra como podemos realçar sua beleza natural com ciência e cuidado.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {TREATMENTS_DATA.map((treatment) => (
              <FeatureCard
                key={treatment.id}
                title={treatment.title}
                description={treatment.description}
                imageUrl={treatment.imageUrl}
                onCardClick={() => setSelectedTreatment(treatment)}
              />
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <InstagramFeedSection />
      <FaqSection />
      <ContactSection />
      <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
      {showBackToTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-rose-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl transition-opacity hover:bg-rose-600 animate-fade-in"
          aria-label="Voltar ao topo"
        >
          &uarr;
        </button>
      )}
    </div>
  );
}