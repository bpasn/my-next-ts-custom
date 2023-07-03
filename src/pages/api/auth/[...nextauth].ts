import { ERole } from "@/services/auth/authService";
import Reporting from "@/utils/Reporting";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
    //first call of jwt function just user object is provided;
    if (user?.email) {
        return { ...token, ...user };
    }

    // on subsequent calls, token is provided and we need to check if it's expired
    if (token?.accessTokenExpires) {
        if (Date.now() / 1000 < Number(token?.accessTokenExpires)) return { ...token, ...user };

    } // else if (token.refreshToken) return refreshAccessToken(token);

    return { ...token, ...user }
}


export const session = ({ session, token }: { session: { token?: string } & Session; token: JWT }) => {

    if (Date.now() / 1000 > Number(token?.accessTokenExpires)) {
        session = {} as any;
        return Promise.resolve({
            ...session,
            error: "Refresh token has expired. Please log in again to get a new refresh token.",
        });
    }
    const accessTokenData = JSON.parse(atob(token?.accessToken.split(".")?.at(1) as string));
    session.user = accessTokenData;
    token.accessTokenExpires = accessTokenData.exp;

    session.accessToken = token?.accessToken;

    return Promise.resolve({ ...session, token });
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, {
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signOut: "/auth/signin",
        },
        providers: [
            CredentialsProvider({
                // The name to display on the sign in form (e.g. "Sign in with...")
                name: "SignIn",
                id: "SignIn",
                // `credentials` is used to generate a form on the sign in page.
                // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    username: { label: "Username", type: "text", placeholder: "jsmith" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    // Add logic here to look up the user from the credentials supplied
                    try {
                        const result = await axios.post("http://localhost:8888/api/auth/signin", {
                            username: credentials?.username,
                            password: credentials?.password
                        })
                        if (result.data.success) {
                            let data = result.data.payload;
                            data.roles = data.roles.map((item: any) => {
                                return item as ERole
                            })
                            // Any object returned will be saved in `user` property of the JWT
                            return data
                        } else {
                            // If you return null then an error will be displayed advising the user to check their details.
                            return null
                            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                        }
                    } catch (error) {
                        console.log(error)
                        throw new Error(new Reporting().reportCli(error).message)
                    }
                }
            })
        ],
        callbacks: {
            session,
            jwt
        }
    })
}