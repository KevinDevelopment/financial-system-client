
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const backendResponse = await fetch(
            `${process.env.BASE_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();

            return NextResponse.json(
                { message: errorData.message },
                { status: backendResponse.status });
        }

        const data = await backendResponse.json();

        const accessToken = data.body.accessToken;
        const refreshToken = data.body.refreshToken;

        const response = NextResponse.json({ success: true });

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/"
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/"
        });

        return response;

    } catch (error) {
        console.error("Erro no endpoint de login:", error);
        return NextResponse.json(
            { message: "Erro interno" },
            { status: 500 }
        );
    }
}