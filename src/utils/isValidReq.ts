import { NextApiRequest, NextApiResponse } from "next";
import { signOut } from "next-auth/react";

export default (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
    const { headers } = req;
    try {
        const accessToken = (headers.authorization || "").replace(/^Bearer\s/, "");
        const accessTokenData = JSON.parse(atob(accessToken.split(".")?.at(1) as string))
        if (!accessToken || Date.now() / 1000 > Number(accessTokenData['exp'])) {
            return res.status(401).json({
                code: 401,
                message: "Unautorization",
            })
        }
        return handler(req, res);
    } catch (error) {
        res.status(500).json(error)
    }
}