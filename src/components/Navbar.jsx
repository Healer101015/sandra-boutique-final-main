import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#8B5E3C] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link className="hover:text-[#F5E6D3] transition" to="/">Home</Link></li>
          <li><Link className="hover:text-[#F5E6D3] transition" to="/moda">Moda</Link></li>
          <li><Link className="hover:text-[#F5E6D3] transition" to="/beleza">Beleza e higiene</Link></li>
          <li><Link className="hover:text-[#F5E6D3] transition" to="/acessorios">Acessórios</Link></li>
          <li><Link className="hover:text-[#F5E6D3] transition" to="/papelaria">Papelaria</Link></li>
          <li><Link className="hover:text-[#F5E6D3] transition" to="/outros">Outros</Link></li>

          {user?.isAdmin && (
            <li>
              <Link
                to="/admin"
                className="bg-[#F5E6D3] text-[#8B5E3C] px-3 py-1 rounded hover:bg-[#EAD5BC] transition"
              >
                Painel Admin
              </Link>
            </li>
          )}
        </ul>

        {/* AÇÕES */}
        <div className="flex items-center gap-4">
          {/* Carrinho */}
          <Link to="/cart" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-[#F5E6D3] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m4-9v9m4-9l2 9" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Usuário */}
          {user ? (
            <>
              <span className="hidden sm:block text-sm">{user.email}</span>
              <button
                onClick={logout}
                className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-[#8B5E3C] transition"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-[#8B5E3C] transition">Login</Link>
              <Link to="/register" className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-[#8B5E3C] transition">Registro</Link>
            </>
          )}

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-[#8B5E3C] border-t border-[#EAD5BC] p-4 text-white">
          <ul className="flex flex-col gap-4 text-sm">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/moda" onClick={() => setMenuOpen(false)}>Moda</Link></li>
            <li><Link to="/beleza" onClick={() => setMenuOpen(false)}>Beleza e higiene</Link></li>
            <li><Link to="/acessorios" onClick={() => setMenuOpen(false)}>Acessórios</Link></li>
            <li><Link to="/papelaria" onClick={() => setMenuOpen(false)}>Papelaria</Link></li>
            <li><Link to="/outros" onClick={() => setMenuOpen(false)}>Outros</Link></li>
            {user?.isAdmin && (
              <li><Link to="/admin" onClick={() => setMenuOpen(false)} className="bg-[#F5E6D3] text-[#8B5E3C] px-3 py-1 rounded">Painel Admin</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
