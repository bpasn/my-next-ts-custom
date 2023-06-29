// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import isValidReq from '@/utils/isValidReq'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  res.status(200).json({ name: 'John Doe' })
}


export default isValidReq(handler)