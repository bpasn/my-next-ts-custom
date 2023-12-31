import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    accessToken?: string;
    error?: string;
    user?: User;
  }

  interface User {
    firstName?: string;
    lastName?: string;
    email?: string | null;
    roles?:ERole[];
    id?: string;
    error?:string;
    contactAddress?: {
      id?: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    roles?:ERole[];
    accessToken: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}