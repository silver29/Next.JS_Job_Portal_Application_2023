import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    /* console.log("middleware",request.nextUrl.pathname);
    return NextResponse.next(); */
    try {
        const isPublicPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register";

        // if there is no token and the page is not public, redirect to login
        const token = request.cookies.get("token")?.value;
        if (!token && !isPublicPage) {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }

        // if there is a token and the page is public , redirect to home
        if (token && isPublicPage) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        return NextResponse.next();

    } catch (error: any) {
        return NextResponse.error();
    }
}

export const config = {
    matcher: ["/", "/login", "/register"]
}