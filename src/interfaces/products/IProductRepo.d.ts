import { NextApiRequest } from "next";

interface IProductRepo {
   getProducts: () => Promise<IPayload>
}
