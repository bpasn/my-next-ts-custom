import { NextApiRequest } from "next";

interface IProductRepo {
   getProducts: (req: NextApiRequest) => Promise<IPayload>
}
