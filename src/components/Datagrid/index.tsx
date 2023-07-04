import axiosInstance from '@/hook/createAxios';
import useEffectHook from '@/hook/useEffectHook';
import Reporting from '@/utils/Reporting';
import { CircularProgress, Pagination, Stack, PaginationItem, Box } from '@mui/material';
import {
  DataGrid, GridColDef, gridPageSelector,
  gridPageCountSelector,
} from '@mui/x-data-grid';
import React from 'react'

type Props = {
  url: string;
  page?: number;
  columns: GridColDef[];
  pagination?: React.ReactNode;
  onChange?: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined;
}
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
/**
 * 
 * 
 * 
 */
function PaginationCustom(
  {
    page = 1,
    count,
    pageCount = 10,
    onChange
  }: {
    count: number
    page: number;
    pageCount: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void
  }
) {
  return (
    <Box width={"100%"} marginLeft={{
      md: 10,
      sm: 3,
      xs: 3
    }} marginRight={{
      md: 10,
      sm: 3,
      xs: 3
    }} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
      <Box >
        Showing page {count ? 1 : 0} of {Math.ceil(count / pageCount)}
      </Box>
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={Math.ceil(count / pageCount)}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={onChange} />
    </Box>
  );

}

const DataGridComponent: React.FunctionComponent<Props> = (
  { columns, page = 1, pagination, onChange, url }
) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [loading, setLoading] = React.useState<boolean>(false);
  const [payload, setPayload] = React.useState<{
    payload: IPayload,
    error?: string | null
  }>({
    payload: {
      data: [],
      count: 0
    },
    error: null
  });
  const [pageCount, setPageCount] = React.useState<number>(5)
  const dataFetchedRef = React.useRef(false);

  const [limit, setLimit] = React.useState<{ start: number, end: number }>({
    start: 0,
    end: pageCount
  })
  const [paginationModel, setPaginationModel] = React.useState<{ page: number, pageSize: number }>({
    page: 0,
    pageSize: pageCount
  })
  if (!pagination) {
    pagination = PaginationCustom({
      page: paginationModel.page,
      pageCount: pageCount,
      count: payload.payload.count,
      onChange: (event, value) => {
        if (value === paginationModel.page + 1) return;
        // setLimit({
        //   start: pageCount * value - pageCount,
        //   end: pageCount * value
        // }) 
        setPaginationModel(prve => ({
          ...prve,
          page: value - 1
        }))
        dataFetchedRef.current = false;
      }
    })
  }

  const fetchData = async () => {
    setLoading(true)
    // setPayload(prve => ({
    //   ...prve,
    //   payload: {
    //     ...prve.payload,
    //     data: []
    //   },
    // }))
    try {
      const { data } = await axiosInstance.get<IPayload>(url, {
        params: {
          ...paginationModel
        }
      });
      if (data) {
        setTimeout(() => {
          setPayload({
            payload: data
          })
          setLoading(false)
        }, 1.5 * 1000)
      }
    } catch (error) {
      setLoading(false)
      setPayload({
        payload: {} as IPayload,
        error: new Reporting().reportCli(error).message
      })
    }
  }


  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, [paginationModel])

  return (
    <DataGrid
    disableColumnSelector
      loading={loading}
      slots={{
        loadIcon: CircularProgress,
        noRowsOverlay: noRow,
        noResultsOverlay: noResultOveray,
        pagination: () => pagination
      }}
      onPaginationModelChange={(pagination) => {
        setPageCount(pagination.pageSize)
        setLimit({
          start: 0,
          end: pagination.pageSize
        })
      }}
      showCellVerticalBorder
      disableColumnFilter
      showColumnVerticalBorder
      getRowId={(row) => row.id}
      rowHeight={90}
      pageSizeOptions={[5, 10, 15]}
      disableRowSelectionOnClick
      disableColumnMenu
      initialState={{
        pagination: {
          paginationModel: { pageSize: pageCount },
        }
      }}
      sx={{
        fontSize: "14px",
        boxShadow: 2,
        '& .MuiDataGrid-overlayWrapper': {
          height: "100px !important",
        },
        '& .MuiDataGrid-cell:hover': {
          color: 'none',
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "inherit" // Or 'transparent' or whatever color you'd like
        },
        '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        "& .MuiDataGrid-columnHeader": {
          whiteSpace: "normal",
          lineHeight: "normal"
        },
      }}
      columns={columns} rows={payload.payload.data ? payload.payload.data : []} />
  )
}

export default DataGridComponent