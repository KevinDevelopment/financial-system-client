"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        label: "Transações",
        href: "/dashboard/transactions",
        icon: (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
        ),
    },
    {
        label: "Relatórios",
        href: "/dashboard/reports",
        icon: (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        label: "Contas",
        href: "/dashboard/accounts",
        icon: (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
    },
    {
        label: "Configurações",
        href: "/dashboard/settings",
        icon: (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

export default function Dashboard() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

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
                </div>
            )}

            {/* ── Content ── */}
            <main className="flex-1 px-5 py-8 max-w-7xl w-full mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                <p className="text-gray-400 text-sm mb-8">Bem-vindo de volta.</p>

                {/* Placeholder para seu conteúdo */}
                <div className="rounded-2xl border-2 border-dashed border-gray-200 h-64 flex items-center justify-center">
                    <p className="text-gray-300 text-sm">Seu conteúdo aqui</p>
                </div>
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