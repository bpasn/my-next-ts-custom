

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectRoutes } from "./routes/routes";
import { ERole } from "./services/auth/authService";

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { authRoutes, protectRoutes } from "./routes/routes";

export default async function middleware(request: NextRequest) {
    const currentUser = await getToken({
        req: request,
        secret: process?.env?.NEXTAUTH_SECRET,
        cookieName: "next-auth.session-token", // next-auth.session-token
    })



    /**
     * 
     * protectRoutes.includes(request.nextUrl.pathname)&& currentUser?.accessToken && Date.now() / 1000 > Number(currentUser.accessTokenExpires)
     * 
     */
    if (
        protectRoutes.includes(request.nextUrl.pathname)
        && !currentUser
    ) {
        const response = NextResponse.redirect(new URL("/auth/signin", request.url));
        return response;
    }

    if (currentUser && currentUser?.roles.includes(ERole.ROLE_ADMIN) && request.nextUrl.pathname == "/") {
        return NextResponse.redirect(new URL("/admin/products", request.url))
    }
    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}
