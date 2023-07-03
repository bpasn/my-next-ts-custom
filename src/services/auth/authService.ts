import { ISignUpRequest } from '@/pages/auth/signup';
import axios, { AxiosInstance, AxiosResponse } from 'axios'


export enum ERole {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_USER = "ROLE_USER",
    ROLE_MOTAL = "ROLE_MOTAL"
}
export interface IUser {
    username: string;
    roles: string[];
    email: string;
    accessToken: string;
    expiredAt: string;
}
export default class AuthService {
    protected readonly instant: AxiosInstance;
    protected readonly BASE_URL: string;
    public constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || ''
        this.instant = axios.create({
            baseURL: this.BASE_URL,
            timeout: 30000,
            timeoutErrorMessage: "Time Out !"
        })
    }

    public login = (username: string, password: string): Promise<IUser> => {
        return this.instant.post<{ payload: IUser, success: boolean }>("/api/auth/signin", {
            username,
            password
        })
            .then((res: AxiosResponse) => {
                return {
                    username: res.data.payload.username,
                    roles: res.data.payload.roles,
                    email: res.data.payload.email,
                    accessToken: res.data.payload.accessToken,
                    expiredAt: res.data.payload.expiredAt
                }
            }).catch((error) => {
                throw new Error(error)
            })
    }

    public signUp = (formData: ISignUpRequest): Promise<{ message: string, status: string, code: number }> => {
        return this.instant.post<{ message: string, status: string, code: number }>('/api/auth/signup', formData)
            .then((res) => {
                return {
                    message: res.data.message,
                    status: res.data.status,
                    code: res.data.code,
                }
            })
    }
}