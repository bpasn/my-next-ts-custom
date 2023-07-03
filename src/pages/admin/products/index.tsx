import React from 'react'
import {
  DataGrid,
  GridColDef,
  useGridApiContext,
  gridPageSelector,
  gridPageCountSelector,
  useGridSelector
} from '@mui/x-data-grid';
import Reporting from '@/utils/Reporting';
import axiosInstance from '@/lib/axios';
import { setAlertState } from '@/lib/slices/AlertSlice';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Pagination, Stack, PaginationItem } from '@mui/material';
import { BsHandbag, BsBagCheck } from 'react-icons/bs';
import { FaPencil } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import useEffectHook from '@/hook/useEffectHook';
import PaginationComponent from '@/components/Pagination';

import * as Components from '@/components';
import { DataGridComponent } from '@/components';


type Props = {
  payload: IPayload,
  error?: string | null;
}
const PAGE_COUNT = 8;
const columns: GridColDef[] = [
  { hideSortIcons: true, sortable: true, hideable: true, field: "id", headerName: "ID", width: 70, filterable: false },
  {
    hideSortIcons: true, sortable: true, field: "image", headerName: "Image", width: 70, renderCell(row) {
      return (
        <Box boxShadow={"1px 2px rgba(151,151,152,11)"} borderRadius={"10px"}>
          <Image style={{ borderRadius: "10px", height: "50px", objectFit: "cover" }} loader={() => "http://localhost:8888" + row.value} src={"http://localhost:8888" + row.value} width={100} height={100} alt={''} />
        </Box>
      )
    }
  },
  { hideSortIcons: true, sortable: true, field: "productName", headerName: "Name", width: 130 },
  { hideSortIcons: true, sortable: true, field: "categoryName", headerName: "Categories Name", width: 130 },
  {
    hideSortIcons: true, sortable: true,
    flex: 1,
    field: "sku", headerName: "SKU", width: 80
  },
  { hideSortIcons: true, sortable: true, field: "price", headerName: "Price", width: 80 },
  { hideSortIcons: true, sortable: true, field: "quantity", headerName: "Quantity", width: 70 },
  {
    hideSortIcons: true, sortable: true, field: "active", headerName: "Status", width: 70,
    align: "center",
    renderCell(row) {
      return row.row.id % 2 === 0 ? <BsHandbag className="text-red-400 font-bold text-[24px]" /> : <BsBagCheck className="text-blue-400 font-bold text-[24px]" />
    }
  },
  {
    flex: 1,
    align:"center",
    field: "", headerName: "Action", renderCell: () => {
      return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"20px"}>
          <FaPencil className=' text-gray-400 font-bold text-[24px] cursor-pointer' onClick={() => console.log("Edit")} />
          <RiDeleteBin6Line className='text-gray-400  font-bold text-[24px] cursor-pointer' onClick={() => console.log("Delete")} />

        </Box>
      )
    }
  }
]



const Products = () => {
  const dispatch = useDispatch();

  return (
    <div className="overflow-auto">
      <DataGridComponent
        url='/api/products/get-all'
        columns={columns}
      />
    </div>
  )


}
// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const { data } = await axiosInstance.get('/api/products/get-all');
//   return {
//     props: {
//       payload: data
//     }
//   }
// }
export default Products

