import AuthService, { IUser } from "@/services/auth/authService";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const sAuth = new AuthService("http://localhost:8888")
export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const user = await sAuth.login(username, password);
        if (user) {
            Cookies.set("currentUser", JSON.stringify(user))
        }
        return user as IUser
    }

    return { login }
}

export const useLogOut = () => {
    const logout = () => {
        Cookies.remove("currentUser");
    }
    return { logout }
}

export const useCurrentUser = () => {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
            setUser(JSON.parse(currentUser))
        }
    }, [])
    return user
}