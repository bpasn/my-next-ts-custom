

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectRoutes } from "./routes/routes";

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { authRoutes, protectRoutes } from "./routes/routes";

export default async function middleware(request: NextRequest) {
    const currentUser = await getToken({
        req: request,
        secret: process?.env?.NEXTAUTH_SECRET,
        cookieName: "next-auth.session-token", // next-auth.session-token
    })
    if (
        protectRoutes.includes(request.nextUrl.pathname)
        && !currentUser
    ) {
        const response = NextResponse.redirect(new URL("/auth/signin", request.url));
        return response;
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

// export async function middleware(request: NextRequest) {
//     const token = await getToken({
//         req: request,
//         secret: process?.env?.NEXTAUTH_SECRET,
//         cookieName: "session-token",// next-auth.session-token
//     });
//     console.log(token)
//     if(!token?.token){
//         return NextResponse.redirect(new URL("/auth/signin",request.url));
//     }
//     //redirect user witout access to login
//     // if (token?.token && Date.now() / 1000 < token?.accessTokenExpires) {
//     //     return NextResponse.redirect("/auth/signin");
//     // }
//     //redirect user without admin access to login
//     if(!token?.isAdmin){
//         return NextResponse.redirect(new URL("/auth/signin",request.url));
//     }
//     return NextResponse.next();
// }