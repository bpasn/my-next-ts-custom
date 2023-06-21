// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useSignUp } from '@/hook/authHook';
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  message: string;
  success: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    useSignUp().signUp(req.body).then(result => {
      res.status(200).json({
        message: "Create User Success",
        success: true
      })
    }).catch((error) => {
      res.status(500).json({
        message: error instanceof Error ? error.message as string : "Internal Server Error",
        success: false
      })
    })
  }
  if (req.method === 'GET') {
    res.status(200).json({
      message: "SIGN UP API",
      success: true
    })

  }

}
