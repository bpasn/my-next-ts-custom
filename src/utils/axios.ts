import axios, { AxiosInstance, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT, getToken } from 'next-auth/jwt';
export default class AxiosHook {
    protected readonly axiosInstance: AxiosInstance | null = null;
    protected accessToken: string | null = null;
    constructor(req: NextApiRequest) {
        if (this.axiosInstance === null) {
            getToken({ req }).then(token => {
                this.accessToken = token?.accessToken as string;
            })
            this.axiosInstance = axios.create({
                baseURL: process.env.NEXT_PUBLIC_DOMAIN
            })
            this.axiosInstance.interceptors.request.use((config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${this.accessToken}`
                }
                return config;
            })
            this.axiosInstance.interceptors.response.use(
                response => response,
                error => {
                    if (error.response?.status === 401) {

                    }
                    return Promise.reject(error)
                },
                {
                    runWhen(config) {
                        const url = ['/auth/signin', '/auth/signup'];
                        return !url.includes(config.url!)
                    },
                }
            )
        }
    }

    async POST<T = any>(url: string, body: T): Promise<AxiosResponse<T, any>> {
        return await this.axiosInstance!.post<T>(url, body)
    }

    async GET<T = any>(url: string, params?: any): Promise<AxiosResponse<T, any>> {
        return await this.axiosInstance!.get<T>(url, { params });
    }
}