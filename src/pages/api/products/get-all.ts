import { NextApiRequest, NextApiResponse } from "next";
import ProductService from "@/services/productService.s";
import Reporting from "@/utils/Reporting";
const handle = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const sProduct = new ProductService(req);
     sProduct.getProducts(req).then(response => {
        res.status(200).json(response)
     }).catch(error => {
        new Reporting().report(error,res)
     })
}
export default handle