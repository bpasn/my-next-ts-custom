import React from 'react'
import {
  DataGrid,
  GridColDef,
  useGridApiContext,
  gridPageSelector,
  gridPageCountSelector,
  useGridSelector
} from '@mui/x-data-grid';
import { GetServerSideProps, GetStaticProps } from 'next';
import Reporting from '@/utils/Reporting';
import axiosInstance from '@/lib/axios';
import { setAlertState } from '@/lib/slices/AlertSlice';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Pagination, Stack, PaginationItem } from '@mui/material';
import { BsHandbag, BsBagCheck } from 'react-icons/bs';
import { FaPencil } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
type Props = {
  payload: IPayload,
  error?: string | null;
}
const columns: GridColDef[] = [
  { hideSortIcons: true, sortable: true, hideable: true, field: "id", headerName: "ID", width: 70, filterable: false },
  { hideSortIcons: true, sortable: true, field: "image", headerName: "Image", width: 70 },
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
      console.log(row)
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
const noRow = () => {
  return <Stack height="100%" alignItems="center" justifyContent="center">
    No rows in DataGrid
  </Stack>
}
const noResultOveray = (): JSX.Element => {
  return <Stack height="100%" alignItems="center" justifyContent="center">
    No rows in DataGrid
  </Stack>
}
const Products = ({ payload, error = null }: Props) => {
  const dispatch = useDispatch();
  if (error) {
    dispatch(setAlertState({
      message: error,
      severity: 'error',
      show: true
    }))
  }
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
 
  return (
    <div className="overflow-auto">
      <DataGrid
        slots={{
          loadIcon: CircularProgress,
          noRowsOverlay: noRow,
          noResultsOverlay: noResultOveray,
          pagination: (state) => {
            console.log(gridPageSelector)
            return <Pagination
              color="primary"
              showFirstButton
              showLastButton
              page={paginationModel.page}
              count={paginationModel.pageSize}
              // @ts-expect-error
              renderItem={props2 => <PaginationItem {...props2} disableRipple />}
              onChange={(event, value) => { }}
            />
          }
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        getRowId={(row) => row.id}
        rowHeight={90}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
        disableColumnMenu
        pagination
        sx={{
          fontSize: "14px",
          boxShadow: 2,
          '& .MuiDataGrid-overlayWrapper': {
            height: "50px !important",
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          "& .MuiDataGrid-columnHeader": {
            whiteSpace: "normal",
            lineHeight: "normal"
          },
        }}

        columns={columns} rows={payload.products} />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await axiosInstance.get('/api/products/get-all');
  return {
    props: {
      payload: data
    }
  }
}
export default Products

