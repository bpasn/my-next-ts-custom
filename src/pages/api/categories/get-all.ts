// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import isValidReq from '@/utils/isValidReq'
import type { NextApiRequest, NextApiResponse } from 'next'

import CategoriesService from '@/services/categoriesService.s'
import Reporting from '@/utils/Reporting';


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const sCategories = new CategoriesService(req);
  sCategories.getCategories().then(response => {
     res.status(200).json(response)
  }).catch(error => {
     new Reporting().report(error,res)
  })
}


export default handler