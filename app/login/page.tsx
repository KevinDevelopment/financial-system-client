"use client";

import financialImage from "../../public/pexels-gabby-k-6289070.jpg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function login() {
        if (!username || !password) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setError("");
            setLoading(true);

            await api.post("/auth/login", { email: username, password });
            router.push("/dashboard");
        } catch (err: any) {
            const message = err.response?.data?.message;
            setError(message ?? "Erro inesperado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-black min-h-screen flex flex-row">
            <div className="hidden lg:flex relative w-1/2">
                <Image
                    src={financialImage}
                    alt="Financial Image"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="bg-white min-h-screen w-full lg:w-1/2 flex flex-col items-center justify-center">
                <div className="w-full max-w-lg flex flex-col gap-6 px-8">

                    <div className="flex flex-col gap-1 mb-2">
                        <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">
                            Portal Financeiro
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Bem-vindo de volta 👋
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Entre com suas credenciais para acessar sua conta.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-sm font-semibold text-gray-600">
                            Usuário
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Digite seu usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && login()}
                            className="rounded-xl w-full px-5 py-4 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-600">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && login()}
                            className="rounded-xl w-full px-5 py-4 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300"
                        />
                        <span className="text-xs text-gray-400 text-right mt-1 cursor-pointer hover:text-black transition-colors">
                            Esqueci minha senha
                        </span>
                    </div>

                    <button
                        onClick={login}
                        disabled={loading}
                        className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    />
                                </svg>
                                Entrando...
                            </>
                        ) : (
                            "Entrar"
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-300 mt-2">
                        Não tem conta?{" "}
                        <span className="text-black font-semibold cursor-pointer hover:underline">
                            Fale com o suporte
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}