import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectRoutes } from "../routes/routes";

export default function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currenUser")?.value;
    console.log(currentUser)
    if (
        protectRoutes.includes(request.nextUrl.pathname) &&
        (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
    ) {
        request.cookies.delete("currentUser");
        const response = NextResponse.redirect(new URL("/auth/signin", request.url));
        response.cookies.delete("currentUser");
        return response;
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/profile", request.url))
    }
}