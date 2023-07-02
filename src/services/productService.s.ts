import Reporting from "@/utils/Reporting";
import AxiosHook from "@/utils/axios";
import { NextApiRequest } from "next";

export default class ProductService implements IProductRepo {
    protected readonly axiosHook: AxiosHook;
    constructor(req: NextApiRequest) {
        this.axiosHook = new AxiosHook(req);
    }
    async getProducts() {
        try {
            const { data: { success, payload } } = await this.axiosHook.GET<{ success: boolean, payload: IPayload }>("/api/products/get-all");
            return payload
        } catch (error) {
            throw new Error(new Reporting().reportCli(error).message)
        }
    }
}