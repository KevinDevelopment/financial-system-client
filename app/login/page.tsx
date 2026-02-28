import financialImage from "../../public/pexels-gabby-k-6289070.jpg";
import Image from "next/image";

export default function Login() {
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
                        <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">Portal Financeiro</p>
                        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta 👋</h1>
                        <p className="text-gray-400 text-sm mt-1">Entre com suas credenciais para acessar sua conta.</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-sm font-semibold text-gray-600">Usuário</label>
                        <input id="username" type="text" placeholder="Digite seu usuário"
                            className="rounded-xl w-full px-5 py-4 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-600">Senha</label>
                        <input id="password" type="password" placeholder="••••••••"
                            className="rounded-xl w-full px-5 py-4 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300" />
                        <span className="text-xs text-gray-400 text-right mt-1 cursor-pointer hover:text-black transition-colors">
                            Esqueci minha senha
                        </span>
                    </div>

                    <button className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors mt-2">
                        Entrar
                    </button>

                    <p className="text-center text-xs text-gray-300 mt-2">
                        Não tem conta? <span className="text-black font-semibold cursor-pointer hover:underline">Fale com o suporte</span>
                    </p>

                </div>
            </div>

        </div>
    );
}