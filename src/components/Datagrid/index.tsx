import { CircularProgress, Pagination, Stack, PaginationItem } from '@mui/material';
import {
  DataGrid, GridColDef, gridPageSelector,
  gridPageCountSelector,
} from '@mui/x-data-grid';
import React from 'react'

type Props = {
  rows: any[];
  page?: number;
  columns: GridColDef[];
  pageCount?: number;
  pagination?: React.ReactNode;
  count: number;
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
  }: {
    count: number
    page: number;
    pageCount: number;
  }
) {
  return <Pagination
    color="primary"
    variant="outlined"
    shape="rounded"
    page={page}
    count={count / pageCount}
    // @ts-expect-error
    renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
    onChange={(event, value) => {
      if (value === page) return;

      
      
    }} />;

}

const DataGridComponent: React.FunctionComponent<Props> = (
  { rows, columns, count, page = 1, pageCount = 10, pagination, onChange }
) => {

  if (!pagination) {
    pagination = PaginationCustom({
      page,
      pageCount,
      count,
    })
  }
  return (
    <DataGrid
      slots={{
        loadIcon: CircularProgress,
        noRowsOverlay: noRow,
        noResultsOverlay: noResultOveray,
        pagination: () => pagination
      }}

      // paginationModel={paginationModel}
      // onPaginationModelChange={setPaginationModel}
      showCellVerticalBorder
      showColumnVerticalBorder
      getRowId={(row) => row.id}
      rowHeight={90}
      pageSizeOptions={[5, 10, 15]}
      disableRowSelectionOnClick
      disableColumnMenu
      pagination
      initialState={{
        pagination: {
          paginationModel: {
            page,
            pageSize: pageCount
          }
        }
      }}
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
      columns={columns} rows={rows} />
  )
}

export default DataGridComponent