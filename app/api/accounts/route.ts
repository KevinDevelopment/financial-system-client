import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Access token não encontrado" },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") ?? "1";
        const perPage = searchParams.get("perPage") ?? "10";

        const backendResponse = await fetch(
            `${process.env.BASE_URL}/accounts?page=${page}&perPage=${perPage}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": accessToken
                }
            }
        );

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();

            const response = NextResponse.json(
                { message: errorData.message },
                { status: backendResponse.status }
            );

            return response;
        }

        const data = await backendResponse.json();
        const accounts = data.body.accounts;
        return NextResponse.json({
            accounts
        });
    } catch (error) {
        console.error("Erro no endpoint de pegar contas:", error);
        return NextResponse.json(
            { message: "Erro interno" },
            { status: 500 }
        );
    }
}