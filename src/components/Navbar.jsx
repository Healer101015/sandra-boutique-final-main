import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar({ currentBgColor }) { // Recebe a cor atual como propriedade
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/agendamento", label: "Agendamento" },
  ];

  return (
    // O Navbar agora é transparente e usa a cor de fundo apenas no menu mobile.
    <nav className="sticky top-0 z-50 bg-transparent text-gray-700 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo Pele Brasileira" className="h-10" />
        </Link>

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="hover:text-rose-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* O menu mobile usa a cor atual para ter um fundo sólido */}
      {menuOpen && (
        <div
          style={{ backgroundColor: currentBgColor }}
          className="md:hidden border-t border-gray-200/50 p-4 text-gray-700"
        >
          <ul className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-rose-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}