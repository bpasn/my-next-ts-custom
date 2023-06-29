// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import isValidReq from '@/utils/isValidReq'
import type { NextApiRequest, NextApiResponse } from 'next'

import CategoriesService from '@/services/categoriesService.s'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const sCategories = new CategoriesService(req);
  const response = await sCategories.getCategories();
  res.status(200).json(response)
}


export default handler