import AxiosHook from "@/utils/axios";
import { Axios } from "axios";
import { NextApiRequest } from "next";

export default class CategoriesService implements ICategoriesRepo {
    protected readonly axiosHook: AxiosHook;
    protected readonly request: NextApiRequest;
    constructor(req: NextApiRequest) {
        this.request = req;
        this.axiosHook = new AxiosHook(req);
    }

    async getCategories(): Promise<IPayload> {
        const { query } = this.request
        const result = await this.axiosHook.GET<{ success: boolean, payload: IPayload }>("/api/categories/get-all", query);
        return result.data.payload;
    }

}