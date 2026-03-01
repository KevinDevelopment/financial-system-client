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
            `${process.env.BASE_URL}/auth/refresh`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            }
        );

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();

            const response = NextResponse.json(
                { message: errorData.message },
                { status: backendResponse.status }
            );

            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");

            return response;
        }

        const data = await backendResponse.json();
        const newAccessToken = data.body;

        const response = NextResponse.json({ success: true });

        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 15,
        });

        return response;

    } catch (error) {
        console.error("Erro ao atualizar access token:", error);

        return NextResponse.json(
            { message: "Erro interno" },
            { status: 500 }
        );
    }
}