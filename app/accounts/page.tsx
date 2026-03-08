"use client";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { api } from "../services/api";
import Link from "next/link";

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

type Account = {
    id: string;
    name: string;
    type: number;
    balance: number;
    initialBalance: number,
    currentBalance: number;
    organizationId: bigint;
    userId: bigint;
};

export default function Dashboard() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);

    async function logout() {
        try {
            setLoggingOut(true);
            await api.post("/auth/logout");
        } catch {
            // mesmo com erro, redireciona
        } finally {
            router.replace("/login");
        }
    }

    const params = new URLSearchParams({
        page: "1",
        perPage: "3"
    });

    async function getAccounts() {
        const { data } = await api.get(`/accounts?${params}`);
        setAccounts(data?.accounts);
    }

    useEffect(() => {
        getAccounts()
    }, [])

    return (
        <div className="min-h-screen bg-[#f4f3f0] flex flex-col">

            {/* ── Top Navbar ── */}
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

            {/* ── Content ── */}
            <main className="flex-1 px-5 py-8 max-w-7xl w-full mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Contas</h1>
                <p className="text-gray-400 text-sm mb-8">
                    Gerencie suas contas financeiras.
                </p>

                {accounts.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="font-semibold text-gray-800 text-lg">
                                        {account.name}
                                    </h2>

                                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                                        {account.type === 1 ? "Carteira" : "Banco"}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Saldo atual</p>

                                    <p className="text-xl font-bold text-gray-900">
                                        {account.currentBalance.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-gray-200 h-64 flex items-center justify-center text-gray-400">
                        Nenhuma conta cadastrada
                    </div>
                )}
            </main>

            {/* ── Footer ── */}
            <footer className="border-t border-gray-200 py-5 px-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#0f0f10] rounded-md flex items-center justify-center">
                            <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
                                <path d="M7 0L13.0622 3.5V10.5L7 14L0.937822 10.5V3.5L7 0Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <span className="text-gray-400 text-xs">Financy © {new Date().getFullYear()}</span>
                    </div>
                    <span className="text-gray-300 text-[11px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        v1.0.0
                    </span>
                </div>
            </footer>

        </div>
    );
}