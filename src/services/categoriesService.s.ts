import AxiosHook from "@/utils/axios";
import { Axios } from "axios";
import { NextApiRequest } from "next";

export default class CategoriesService extends Axios implements ICategoriesRepo {
    protected readonly axiosHook: AxiosHook;
    constructor(req: NextApiRequest) {
        super()
        this.axiosHook = new AxiosHook(req);
    }

    async getCategories():Promise<Categories[]> {
        const result = await this.axiosHook.GET<{ success: boolean, payload: Categories[] }>("/api/categories/get-all");
        return result.data.payload;
    }

}