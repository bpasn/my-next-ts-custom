import axios, { AxiosInstance, AxiosResponse } from 'axios'
export interface IUser {
    username: string;
    accessToken: string;
    expiredAt: string;
}
export default class AuthService {
    protected readonly instant: AxiosInstance;

    public constructor(url: string) {
        this.instant = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time Out !"
        })
    }

    login = (username: string, password: string): Promise<IUser> => {
        return this.instant.post<{ payload: IUser, success: boolean }>("/login", {
            username,
            password
        })
            .then((res: AxiosResponse) => {
                return {
                    username: res.data.payload.username,
                    accessToken: res.data.payload.accessToken,
                    expiredAt: res.data.payload.expiredAt
                }
            })
    }
}