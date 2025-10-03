// ... (outros imports)
import { Link } from "react-router-dom";
// ...

// Dentro do seu componente Navbar, encontre a lista de links (geralmente uma tag <ul> ou <nav>)
// E adicione o <Link> para a página de Agendamento.

// Exemplo (a estrutura exata pode variar no seu arquivo):
<ul className="flex items-center gap-6 text-sm">
  <li>
    <Link to="/" className="font-bold text-amber-900 hover:text-amber-700 transition-colors">
      Início
    </Link>
  </li>
  <li>
    {/* ESTE É O NOVO LINK QUE VOCÊ DEVE ADICIONAR */}
    <Link to="/agendamento" className="font-bold text-amber-900 hover:text-amber-700 transition-colors">
      Agendamento
    </Link>
  </li>
  {/* ... outros links como Carrinho, Login, etc. */}
</ul>