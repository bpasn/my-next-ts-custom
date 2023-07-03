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
          <Image loader={() => "http://localhost:8888" + row.value} src={"http://localhost:8888" + row.value} width={70} height={70} alt={''} />
        </Box>
      )
    }
  },
  { hideSortIcons: true, sortable: true, field: "productName", headerName: "Name", width: 130 },
  { hideSortIcons: true, sortable: true, field: "categoryName", headerName: "Categories Name", width: 130 },
  {
    hideSortIcons: true, sortable: true,

    field: "sku", headerName: "SKU", width: 80
  },
  { hideSortIcons: true, sortable: true, field: "price", headerName: "Price", width: 80 },
  { hideSortIcons: true, sortable: true, field: "quantity", headerName: "Quantity", width: 70 },
  {
    hideSortIcons: true, sortable: true, field: "active", headerName: "Status", width: 70,
    align: "center",
    renderCell(row) {
      return row.value !== "ACTIVE" ? <BsHandbag className="text-red-400 font-bold text-[24px]" /> : <BsBagCheck className="text-blue-400 font-bold text-[24px]" />
    }
  },
  {
    flex: 1,
    field: "", headerName: "Action", renderCell: () => {
      return (<button onClick={() => console.log("Edit")}>edit</button>)
    }
  }
]



const Products = () => {
  const dispatch = useDispatch();
  const [start, setStart] = React.useState(0);
  const [offset, setOffset] = React.useState(PAGE_COUNT);

  const [payload, setPayload] = React.useState<{
    payload: IPayload,
    error?: string | null
  }>({
    payload: {
      products: [],
      count: 0
    },
    error: null
  });

  if (payload.error) {
    dispatch(setAlertState({
      message: payload.error,
      severity: 'error',
      show: true
    }))
  }

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get<IPayload>('/api/products/get-all', {
        params: {
          limit: start,
          offset: offset
        }
      });
      if (data) {
        setPayload({
          payload: data
        })
      }
    } catch (error) {
      setPayload({
        payload: {} as IPayload,
        error: new Reporting().reportCli(error).message
      })
    }
  }
  React.useEffect(() => {
    fetchData()
  }, [start, offset])



  return (
    <div className="overflow-auto">
      <DataGridComponent
        rows={payload.payload.products}
        columns={columns}
        count={payload.payload.count}
        pageCount={PAGE_COUNT + 2}
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

