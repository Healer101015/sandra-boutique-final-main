import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Componente para feedback visual (sucesso ou erro)
const Alert = ({ message, type }) => {
    const baseClasses = "p-4 rounded-md text-sm font-medium text-center";
    const typeClasses = {
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
    };
    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            {message}
        </div>
    );
};

export default function Scheduling() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'Consulta Inicial',
        preferredDate: '',
        preferredTime: 'Manhã (9h-12h)',
        notes: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        message: '',
        type: '' // 'success' ou 'error'
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // A mágica acontece aqui: o frontend envia os dados para o backend.
            await axios.post('http://localhost:5000/api/appointments', formData);

            setFormStatus({
                submitted: true,
                message: 'Solicitação de agendamento enviada com sucesso! Entraremos em contato em breve para confirmar.',
                type: 'success',
            });

            // Limpa o formulário após o sucesso
            setFormData({
                name: '', email: '', phone: '', service: 'Consulta Inicial',
                preferredDate: '', preferredTime: 'Manhã (9h-12h)', notes: ''
            });

        } catch (error) {
            setFormStatus({
                submitted: true,
                message: 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.',
                type: 'error',
            });
            console.error("Erro no agendamento:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFF9F3] to-[#FAF7F0]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-amber-800 tracking-tight">Agende sua Consulta</h1>
                        <p className="mt-2 text-amber-900/70">
                            Preencha o formulário abaixo para dar o primeiro passo em direção à sua melhor versão.
                        </p>
                    </div>

                    {formStatus.submitted ? (
                        <Alert message={formStatus.message} type={formStatus.type} />
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
                            {/* Nome, Email, Telefone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-amber-800">Nome Completo</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-amber-800">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                            </div>

                            {/* Telefone e Serviço */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-amber-800">Telefone / WhatsApp</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="(XX) XXXXX-XXXX" />
                            </div>

                            {/* Serviço */}
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-amber-800">Qual serviço você procura?</label>
                                <select name="service" id="service" value={formData.service} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                                    <option>Consulta Inicial</option>
                                    <option>Tratamento Clínico</option>
                                    <option>Nutracêuticos</option>
                                    <option>Outro</option>
                                </select>
                            </div>

                            {/* Data e Hora */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="preferredDate" className="block text-sm font-medium text-amber-800">Data de Preferência</label>
                                    <input type="date" name="preferredDate" id="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="preferredTime" className="block text-sm font-medium text-amber-800">Período de Preferência</label>
                                    <select name="preferredTime" id="preferredTime" value={formData.preferredTime} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                                        <option>Manhã (9h-12h)</option>
                                        <option>Tarde (14h-18h)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Notas Adicionais */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-amber-800">Informações Adicionais (opcional)</label>
                                <textarea name="notes" id="notes" rows="4" value={formData.notes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="Nos conte um pouco mais sobre o que você precisa..."></textarea>
                            </div>

                            {/* Botão de Envio */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-400"
                                >
                                    {isLoading ? 'Enviando...' : 'Solicitar Agendamento'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}