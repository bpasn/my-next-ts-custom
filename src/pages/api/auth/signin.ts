// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { useLogin } from '@/hook/authHook';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

type Data = {
  message: string;
  success: boolean;
}

interface Request extends NextApiRequest {
  body: {
    username: string,
    password: string
  }
}
export default function handler(
  req: Request,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    useLogin().login(req.body.username, req.body.password)
      .then((result) => {
        res.status(200).json({
          message: "sign suc",
          success: true
        })
      }).catch((error) => {
        res.status(500).json({
          message: error instanceof AxiosError ? error.response?.data.message : "Internal Server Error" as string,
          success: false
        })
      })
  }
}
