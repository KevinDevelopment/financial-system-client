import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Refresh token não encontrado" },
                { status: 401 }
            );
        }

        const backendResponse = await fetch(
            `${process.env.BASE_URL}/auth/logout`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            }
        );

        const response = backendResponse.ok
            ? NextResponse.json({ success: true })
            : NextResponse.json({ message: "Erro ao deslogar no servidor" }, { status: backendResponse.status });

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        return response;

    } catch (error) {
        console.error("Erro ao deslogar:", error);

        const response = NextResponse.json(
            { message: "Erro interno" },
            { status: 500 }
        );

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        return response;
    }
}