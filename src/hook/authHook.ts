import { ISignUpRequest } from "@/pages/auth/signup";
import AuthService, { IUser } from "@/services/auth/authService";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useStorage from "./hookStore";

const sAuth = new AuthService()
export const useLogin = () => {
    const { setItem, getItem, removeItem } = useStorage()
    const login = async (username: string, password: string) => {
        const user = await sAuth.login(username, password);
        if (user) {
            Cookies.set("currentUser", JSON.stringify(user))
        }
        return user as IUser
    }
    Cookies.set("currentUser", JSON.stringify("user"))
    return { login }
}

export const useSignUp = () => {
    const signUp = async (formData: ISignUpRequest) => {
        const data = await sAuth.signUp(formData);
        if (data.code === 200) {
            return data
        }
    }
    return { signUp }
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