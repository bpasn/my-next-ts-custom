// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AuthService from '../../../../services/auth/authService'
import { ISignUpRequest } from '../../../auth/signup'
import { AxiosError } from 'axios'
import Reporting from '../../../../utils/Reporting'

interface IRequest extends NextApiRequest {
    body: ISignUpRequest
}
export default function handler(
    req: IRequest,
    res: NextApiResponse
) {
    const SAuth = new AuthService();
    if (req.method === "POST") {
        SAuth.signUp(req.body).then(response => {
            res.status(201).json(response)
        }).catch(error => {
            new Reporting().report(error,res)
        })
    }
}
