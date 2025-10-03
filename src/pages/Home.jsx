import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import CarouselBanner from "../components/CarouselBanner";
import ProductCard from "../components/ProductCard";
import { Alert } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart } from "lucide-react";

// Debounce util
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [gridCols, setGridCols] = useState(4);
  const [pageSize] = useState(12);
  const [page, setPage] = useState(1);

  // wishlist simples
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const { addToCart, alertMessage, clearAlert } = useContext(CartContext);
  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => setProducts(res.data || []))
      .catch(() =>
        setError("Erro ao carregar produtos. Tente novamente mais tarde.")
      )
      .finally(() => setLoading(false));
  }, []);

  // categorias dinamicas
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Outros"));
    return ["all", ...Array.from(set)];
  }, [products]);

  // filtro + busca + ordenação
  const filtered = useMemo(() => {
    let list = [...products];
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      list = list.filter((p) => (p.category || "Outros") === category);
    }
    if (sort === "price_asc")
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === "price_desc")
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sort === "new")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sort === "rating")
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  }, [products, debouncedQuery, category, sort]);

  // paginação "Load more"
  useEffect(() => {
    const start = 0;
    const end = pageSize * page;
    setVisibleProducts(filtered.slice(start, end));
  }, [filtered, page, pageSize]);

  // limpa alerta automaticamente
  useEffect(() => {
    if (alertMessage) {
      const t = setTimeout(clearAlert, 3000);
      return () => clearTimeout(t);
    }
  }, [alertMessage, clearAlert]);

  // wishlist handlers
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("wishlist", JSON.stringify(next));
      return next;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const [quickView, setQuickView] = useState(null);

  const gridColsClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[gridCols] || "lg:grid-cols-4";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFF9F3] to-[#FAF7F0]">
      <Navbar />
      <CarouselBanner />

      {/* Alert fixado no topo */}
      {alertMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
        >
          <Alert
            color="amber"
            variant="filled"
            className="rounded-lg shadow-md transition-opacity duration-500"
          >
            {alertMessage}
          </Alert>
        </motion.div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              Produtos para manter sua pele saudável e bonita
            </h1>
            <p className="text-amber-900/70 mt-1 max-w-xl">
              Explore nossa seleção exclusiva — use os filtros e busca para
              encontrar o produto ideal.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <input
                aria-label="Pesquisar produtos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 rounded-lg border border-amber-300 shadow-sm text-amber-900 focus:outline-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <span className="absolute left-3 top-2.5 text-amber-500"></span>
            </div>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-lg border border-amber-300 text-amber-900 hover:shadow"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "Todas" : c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-lg border border-amber-300 text-amber-900 hover:shadow"
            >
              <option value="relevance">Relevância</option>
              <option value="new">Mais novos</option>
              <option value="price_asc">Preço: menor</option>
              <option value="price_desc">Preço: maior</option>
              <option value="rating">Avaliação</option>
            </select>

            <div className="flex items-center space-x-2">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  title={`${num} colunas`}
                  onClick={() => setGridCols(num)}
                  className={`p-2 rounded transition ${gridCols === num
                    ? "bg-amber-700 text-white shadow-md"
                    : "bg-white text-amber-700 border border-amber-300 hover:bg-amber-100"
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Resultados */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg p-4 h-72 shadow"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : visibleProducts.length === 0 ? (
          <p className="text-center text-amber-800">Nenhum produto encontrado.</p>
        ) : (
          <>
            <motion.div
              layout
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridColsClass} gap-6`}
            >
              {visibleProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={() => toggleWishlist(product._id)}
                    wished={wishlist.includes(product._id)}
                    onQuickView={() => setQuickView(product)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {visibleProducts.length < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-500 text-white rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2"
                >
                  ⬇ Carregar mais
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Quick view modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
            onClick={() => setQuickView(null)}
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-amber-800">
                  {quickView.name}
                </h3>
                <button
                  onClick={() => setQuickView(null)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <motion.img
                  key={quickView.imageUrl}
                  src={quickView.imageUrl || "https://via.placeholder.com/600"}
                  alt={quickView.name}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <div>
                  <p className="text-amber-700 font-bold text-2xl mb-2">
                    R$ {(quickView.price || 0).toFixed(2)}
                  </p>
                  <p className="text-gray-600 mb-4">{quickView.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleAddToCart(quickView);
                        setQuickView(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
                    >
                      <ShoppingCart className="w-5 h-5" /> Adicionar
                    </button>
                    <button
                      onClick={() => toggleWishlist(quickView._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${wishlist.includes(quickView._id)
                        ? "bg-red-100 border-red-500 text-red-500"
                        : "border-amber-700 text-amber-700 hover:bg-amber-100"
                        }`}
                    >
                      <Heart className="w-5 h-5" />{" "}
                      {wishlist.includes(quickView._id)
                        ? "Remover"
                        : "Favoritar"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
