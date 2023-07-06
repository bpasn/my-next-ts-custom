import axiosInstance from '@/hook/createAxios';
import Reporting from '@/utils/Reporting';
import _ from 'lodash';
import { CircularProgress, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'
import PaginationCustom from './pagination';
import { useDispatch } from 'react-redux';
import { setAlertState } from '@/lib/slices/AlertSlice';

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


const DataGridComponent: React.FunctionComponent<Props> = ({ columns, pagination, url }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [payload, setPayload] = React.useState<IPayload>({ data: [], count: 0 });
  const [pageCount, setPageCount] = React.useState<number>(5)
  const dataFetchedRef = React.useRef(false);
  const dispatch = useDispatch();
  // const [limit, setLimit] = React.useState<{ start: number, end: number }>({
  //   start: 0,
  //   end: pageCount
  // })
  const [paginationModel, setPaginationModel] = React.useState<{ page: number, pageSize: number }>({
    page: 0,
    pageSize: pageCount
  })

  if (!pagination) {
    pagination = PaginationCustom({
      page: paginationModel.page,
      pageCount: pageCount,
      count: payload.count,
      optionPaginationChange(event, child) {
        setPageCount(event.target.value as number)
        setPaginationModel(prve => ({...prve,pageSize:event.target.value as number}))
        dataFetchedRef.current = false;
      },
      optionsPagination: [5, 10, 20, 100],
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
    try {
      const { data } = await axiosInstance.get<IPayload>(url, {
        params: {
          ...paginationModel
        }
      });
      if (data) {
        setTimeout(() => {
          setPayload(data)
          setLoading(false)
        }, 1.5 * 1000)
      }
    } catch (error) {
      setLoading(false)
      dispatch(setAlertState({
        message: new Reporting().reportCli(error).message,
        show: true,
        severity: "error"
      }))
    }
  }

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();

  }, [paginationModel, dispatch, pageCount])

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
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
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
      columns={columns} rows={!_.isEmpty(payload.data) ? payload.data : []} />
  )
}

export default DataGridComponent