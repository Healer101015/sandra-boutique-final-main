import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const [cepDestino, setCepDestino] = useState("");
  const [frete, setFrete] = useState(null);
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState("");

  const handleQuantityChange = (id, e) => {
    const value = parseInt(e.target.value);
    if (value > 0) updateQuantity(id, value);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calcularFrete = async () => {
    if (!cepDestino || cepDestino.length < 8) {
      alert("Digite um CEP válido.");
      return;
    }

    const pesoTotal = cart.reduce((sum, item) => sum + (item.weight || 0.5) * item.quantity, 0);
    const comprimento = 20;
    const altura = 10;
    const largura = 15;

    try {
      setLoadingFrete(true);
      setErroFrete("");

      const url = new URL("http://localhost:4000/api/frete");
      url.searchParams.set("cepDestino", cepDestino.replace("-", ""));
      url.searchParams.set("peso", pesoTotal.toFixed(2));
      url.searchParams.set("comprimento", comprimento);
      url.searchParams.set("altura", altura);
      url.searchParams.set("largura", largura);

      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        setErroFrete(data.error);
        setFrete(null);
      } else {
        setFrete({ valor: data.valor, prazo: data.prazo });
      }
    } catch (err) {
      setErroFrete("Erro ao calcular frete.");
      setFrete(null);
    } finally {
      setLoadingFrete(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F0]">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#995B00]">
          Seu Carrinho ({cart.length} {cart.length === 1 ? "Item" : "Itens"})
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-[#7A5E3C] text-lg">Seu carrinho está vazio.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Cabeçalho da tabela */}
            <div className="grid grid-cols-12 gap-4 border-b border-[#C9A14A] pb-2 mb-4 text-[#7A5E3C] font-semibold text-sm select-none">
              <div className="col-span-5">Itens</div>
              <div className="col-span-2 text-center">Preço</div>
              <div className="col-span-2 text-center">Quantidade</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1"></div>
            </div>

            {/* Lista de itens */}
            <ul>
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="grid grid-cols-12 gap-4 items-center border-b border-[#E2D7A9] py-4"
                >
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-[#C9A14A]"
                    />
                    <div>
                      <h3 className="font-semibold text-[#4D3A00]">{item.name}</h3>
                      <p className="text-xs text-[#7A5E3C] mt-1">
                        {item.description && item.description.length > 60
                          ? item.description.slice(0, 57) + "..."
                          : item.description || ""}
                      </p>
                      <p className="text-xs font-bold mt-1 text-[#7A5E3C]">{item.brand || ""}</p>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-[#995B00] font-semibold text-base">
                    R$ {item.price.toFixed(2)}
                  </div>

                  <div className="col-span-2 flex justify-center items-center">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity > 1 ? item.quantity - 1 : 1)
                      }
                      className="px-2 py-1 border border-[#C9A14A] text-[#995B00] font-bold hover:bg-[#C9A14A] hover:text-white transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e)}
                      className="w-12 text-center mx-2 border border-[#C9A14A] rounded text-[#995B00]"
                    />
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-2 py-1 border border-[#C9A14A] text-[#995B00] font-bold hover:bg-[#C9A14A] hover:text-white transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="col-span-2 text-center font-semibold text-[#995B00]">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-[#995B00] hover:text-[#7A5E3C] font-bold text-xl"
                      title="Remover item"
                      aria-label={`Remover ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* CEP e botão calcular frete */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cepDestino}
                onChange={(e) => setCepDestino(e.target.value)}
                className="border border-[#C9A14A] px-4 py-2 rounded w-60 focus:outline-none focus:ring-2 focus:ring-[#995B00]"
              />
              <button
                onClick={calcularFrete}
                className="bg-[#995B00] text-white px-5 py-2 rounded hover:bg-[#7A5E3C] transition"
              >
                {loadingFrete ? "Calculando..." : "Calcular Frete"}
              </button>
              {frete && (
                <div className="text-[#4D3A00] font-semibold">
                  Frete: R$ {frete.valor.toFixed(2)} (Prazo: {frete.prazo} dias úteis)
                </div>
              )}
              {erroFrete && (
                <div className="text-red-600 font-semibold">
                  {erroFrete}
                </div>
              )}
            </div>

            {/* Total e botões */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-[#C9A14A] pt-6">
              <div className="text-xl font-bold text-[#995B00] mb-4 sm:mb-0">
                Subtotal: R$ {totalPrice.toFixed(2)}<br />
                {frete && (
                  <>
                    Frete: R$ {frete.valor.toFixed(2)}<br />
                    <span className="text-2xl">
                      Total: R$ {(totalPrice + frete.valor).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="border border-[#C9A14A] text-[#995B00] px-5 py-2 rounded hover:bg-[#C9A14A] hover:text-white transition"
                >
                  Continuar comprando
                </Link>
                <Link
                  to="/checkout"
                  className="bg-[#995B00] text-white px-5 py-2 rounded hover:bg-[#7A5E3C] transition"
                >
                  Finalizar compra
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
