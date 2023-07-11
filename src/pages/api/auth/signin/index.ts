import { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@/services/auth/authService";
import Reporting from "@/utils/Reporting";
import { omit } from "lodash";
import cookie from 'js-cookie';
import Cookies from "cookies";
export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body
    const cookie = Cookies(req,res)
    const sAuth = new AuthService();
    sAuth.login(username, password).then(result => {
        cookie.set("accessToken",result.accessToken)
        cookie.set("sessionToken",btoa(JSON.stringify(result)))
        res.json(omit(result, ['accessToken']))
    }).catch(error => {
        res.json(new Reporting().report(error, res))
    })

}