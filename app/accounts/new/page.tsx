"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/app/services/api";
import { useState } from "react";

export default function NewAccountPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState(1);
    const [initialBalance, setInitialBalance] = useState("");
    const [loading, setLoading] = useState(false);

    async function logout() {
        try {
            setLoggingOut(true);
            await api.post("/auth/logout");
        } catch {
        } finally {
            router.replace("/login");
        }
    }

    async function createAccount(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/accounts", {
                name,
                type,
                initialBalance: Number(initialBalance),
                currentBalance: Number(initialBalance),
            });

            router.push("/accounts");
        } catch {
            alert("Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    }

    const navItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
            ),
        },
        {
            label: "Contas",
            href: "/accounts",
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        }
    ];

    return (
        <div className="min-h-screen bg-[#f4f3f0] flex flex-col">

            {/* ── Navbar ── */}
            <header className="h-14 bg-[#0f0f10] border-b border-white/5 flex items-center px-5 gap-4 sticky top-0 z-40">

                {/* Logo */}
                <div className="flex items-center gap-2.5 mr-4">
                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M7 0L13.0622 3.5V10.5L7 14L0.937822 10.5V3.5L7 0Z" fill="white" fillOpacity="0.9" />
                        </svg>
                    </div>
                    <span className="text-white/80 text-sm font-semibold tracking-wide hidden sm:block">
                        Financy
                    </span>
                </div>

                {/* Nav links — desktop */}
                <nav className="hidden md:flex items-center gap-1 flex-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                    ${active
                                        ? "bg-white/10 text-white"
                                        : "text-white/40 hover:text-white/75 hover:bg-white/6"
                                    }`}
                            >
                                <span className="w-4 h-4">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-3">

                    {/* Status */}
                    <div className="hidden sm:flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white/25 text-[11px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            sistema ok
                        </span>
                    </div>

                    {/* Logout button */}
                    <button
                        onClick={logout}
                        disabled={loggingOut}
                        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/35 hover:text-red-400 hover:bg-red-400/8 transition-all disabled:opacity-40"
                    >
                        {loggingOut ? (
                            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : (
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        )}
                        Sair
                    </button>

                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/60 text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors">
                        A
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white/50 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[#0f0f10] border-b border-white/5 px-4 py-3 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                    ${active
                                        ? "bg-white/10 text-white"
                                        : "text-white/40 hover:text-white/75 hover:bg-white/6"
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Logout mobile */}
                    <button
                        onClick={logout}
                        disabled={loggingOut}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/8 transition-all mt-1 border-t border-white/5 pt-3"
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sair
                    </button>
                </div>
            )}

            {/* ── Conteúdo ── */}
            <main className="flex-1 flex justify-center items-start px-4 py-10">

                <form
                    onSubmit={createAccount}
                    className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5"
                >
                    <h2 className="text-lg font-semibold text-gray-800">
                        Nova Conta
                    </h2>

                    {/* Nome */}
                    <div>
                        <label className="text-sm text-gray-600">
                            Nome da conta
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Tipo */}
                    <div>
                        <label className="text-sm text-gray-600">
                            Tipo da conta
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(Number(e.target.value))}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value={1}>Conta Corrente</option>
                            <option value={2}>Poupança</option>
                            <option value={3}>Carteira Digital</option>
                        </select>
                    </div>

                    {/* Saldo */}
                    <div>
                        <label className="text-sm text-gray-600">
                            Saldo inicial
                        </label>
                        <input
                            type="number"
                            value={initialBalance}
                            onChange={(e) => setInitialBalance(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded-lg text-sm hover:bg-gray-900"
                    >
                        {loading ? "Criando..." : "Criar Conta"}
                    </button>

                </form>

            </main>
        </div>
    );
}