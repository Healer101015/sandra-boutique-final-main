import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#F5E6D3] text-[#5a4632] pt-12 pb-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Informação */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-[#D7B899] pb-1 text-[#8B5E3C]">
            Informação
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Sobre nós</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Política de Privacidade</li>
          </ul>
        </div>

        {/* Ajuda */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-[#D7B899] pb-1 text-[#8B5E3C]">
            Ajuda
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Como comprar</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Métodos de pagamento</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Perguntas frequentes</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Contato</li>
          </ul>
        </div>

        {/* Categorias */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-[#D7B899] pb-1 text-[#8B5E3C]">
            Categorias
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Moda</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Beleza e Higiene</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Acessórios</li>
            <li className="hover:text-[#8B5E3C] transition cursor-pointer">Papelaria</li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div>
          <h4 className="font-bold text-lg mb-3 border-b-2 border-[#D7B899] pb-1 text-[#8B5E3C]">
            Siga-nos
          </h4>
          <div className="flex gap-4 mt-2">
            {[
              { icon: "https://cdn-icons-png.flaticon.com/512/1384/1384005.png", alt: "Instagram" },
              { icon: "https://cdn-icons-png.flaticon.com/512/1384/1384017.png", alt: "Facebook" },
              { icon: "https://cdn-icons-png.flaticon.com/512/1384/1384028.png", alt: "YouTube" },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className="hover:scale-110 transition transform"
              >
                <img
                  src={social.icon}
                  alt={social.alt}
                  className="w-6 filter brightness-90 hover:brightness-110"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-[#D7B899] pt-4 text-center text-xs text-[#6F472F]">
        © {new Date().getFullYear()} Seu E-commerce — Todos os direitos reservados.
      </div>
    </footer>
  );
}
