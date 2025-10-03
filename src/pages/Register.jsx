import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/register", { email, password });
            alert("Usuário criado!");
        } catch (err) {
            alert("Erro ao registrar");
        }
    };

    return (
        <form
            onSubmit={register}
            className="max-w-md mx-auto mt-16 p-6 border border-gray-300 rounded shadow-sm"
        >
            <h2 className="text-2xl text-yellow-800 font-light mb-6 text-center">
                Registro
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
                Registrar
            </button>
        </form>
    );
}
