import axiosInstance from "@/lib/axios";
import { AppState } from "@/lib/store";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function useAxioshook() {
    const dispatch = useDispatch();
    const session = useSession();
    useEffect(() => {
        axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${session.data?.accessToken}`
                }
                return config;
            }
        );
        axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response
            },
            (error: AxiosError) => {
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
    }, [dispatch])
    return axiosInstance;
}