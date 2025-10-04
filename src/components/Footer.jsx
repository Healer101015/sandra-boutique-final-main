import React from "react";
import { Link } from "react-router-dom"; // Importe o Link

export default function Footer() {
  return (
    <footer className="bg-white/50 text-gray-700 pt-12 pb-6 shadow-inner backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Sobre */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-rose-100 pb-1 text-gray-800">
            Pele Brasileira
          </h4>
          <p className="text-sm text-gray-600">
            Excelência em estética clínica e nutracêuticos. Cuidando da sua beleza com ciência e carinho.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-rose-100 pb-1 text-gray-800">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-rose-400 transition-colors">Início</Link></li>
            <li><Link to="/agendamento" className="hover:text-rose-400 transition-colors">Agendamento</Link></li>
            <li className="hover:text-rose-400 transition-colors cursor-pointer">Tratamentos</li>
            <li className="hover:text-rose-400 transition-colors cursor-pointer">Contato</li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-rose-100 pb-1 text-gray-800">
            Siga-nos
          </h4>
          <div className="flex gap-4 mt-2">
            {[
              { icon: "https://cdn-icons-png.flaticon.com/512/1384/1384005.png", alt: "Instagram", url: "https://www.instagram.com/pele_brasileira_estetica" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform"
              >
                <img
                  src={social.icon}
                  alt={social.alt}
                  className="w-7 filter brightness-90 hover:brightness-110"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-rose-100 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Pele Brasileira — Todos os direitos reservados.
      </div>
    </footer>
  );
}