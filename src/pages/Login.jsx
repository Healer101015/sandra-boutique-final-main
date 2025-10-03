import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            navigate("/");
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch {
            alert("Login inválido");
        }
    };

    return (
        <form
            onSubmit={login}
            className="max-w-md mx-auto mt-16 p-6 border border-gray-300 rounded shadow-sm"
        >
            <h2 className="text-2xl text-yellow-800 font-light mb-6 text-center">
                Entrar na sua conta
            </h2>

            <label className="block mb-1 text-sm text-yellow-800">Email</label>
            <input
                type="email"
                placeholder="Digite seu email"
                className="border border-gray-300 p-2 w-full rounded mb-4 text-sm outline-yellow-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label className="block mb-1 text-sm text-yellow-800">Senha</label>
            <input
                type="password"
                placeholder="Digite sua senha"
                className="border border-gray-300 p-2 w-full rounded mb-6 text-sm outline-yellow-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button
                type="submit"
                className="w-full bg-yellow-700 text-white text-sm py-2 rounded hover:bg-yellow-800 transition"
            >
                Entrar
            </button>
        </form>
    );
}
