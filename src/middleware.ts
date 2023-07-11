

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectRoutes } from "./routes/routes";
import { ERole, IUser } from "./services/auth/authService";
import _ from 'lodash'

type SessionToken = {
    sub: string;
    lat: number;
    exp: number;
} & IUser
const getAccessToken = (request: NextRequest): SessionToken | null => {

    if (_.isEmpty(request.cookies.get("accessToken")) || _.isEmpty(request.cookies.get("sessionToken"))) return null;
    const accessToken = JSON.parse(atob(request.cookies.get("accessToken")?.value.split(".").at(1) as string))
    const sessionToken = JSON.parse(atob(request.cookies.get("sessionToken")?.value as string))

    // const accessToken = JSON.parse(atob(request.cookies.get("accessToken")?.value.split(".").at(1) as string));
    // const sessionToken = JSON.parse(atob(request.cookies.get("sessionToken")?.value.split(".").at(1) as string));
    return { ...accessToken, ...sessionToken }
}
export default async function middleware(request: NextRequest) {
    const currentUser = await getToken({
        req: request,
        secret: process?.env?.NEXTAUTH_SECRET,
        cookieName: "next-auth.session-token", // next-auth.session-token
    })
    const accessToken = getAccessToken(request)

    /**
     * 
     * protectRoutes.includes(request.nextUrl.pathname)&& currentUser?.accessToken && Date.now() / 1000 > Number(currentUser.accessTokenExpires)
     * 
     */
    
    if (
        (protectRoutes.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith("/admin"))
        && !accessToken || Number(accessToken?.exp) < Date.now() / 1000
    ) {
        const response = NextResponse.redirect(new URL("/auth/signin", request.url));
        response.cookies.delete("accessToken")
        response.cookies.delete("sessionToken")
        return response;
    } else {
        if (protectRoutes.includes(request.nextUrl.pathname) && accessToken && accessToken.roles?.includes(ERole.ROLE_ADMIN)) {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
    }
    // if (currentUser) {
    //     if (currentUser.roles?.includes(ERole.ROLE_ADMIN)) {
    //         return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    //     } else if (currentUser.roles?.includes(ERole.ROLE_USER)) {
    //         return NextResponse.redirect(new URL("/client", request.url));
    //     }else{
    //         return NextResponse.redirect(new URL("/", request.url));
    //     }
    // }


    if (authRoutes.includes(request.nextUrl.pathname) && accessToken) {

        return NextResponse.redirect(new URL("/", request.url))
    }

}
