import { Box, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

type Props = {
    count: number;
    pageCount: number;
    optionsPagination: number[];
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    optionPaginationChange: ((event: SelectChangeEvent<number>, child: React.ReactNode) => void) | undefined
}

const PaginationCustom: React.FC<Props> = ({ optionsPagination, optionPaginationChange, count, pageCount, page, onChange }) => {
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
            <div className="flex pt-[10px] pb-[10px] gap-3 items-center">
                <span className='flex-1 ml-3 text-left whitespace-nowrap'>Showing page</span>
                <Select
                    className='h-[32px]'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageCount}
                    onChange={optionPaginationChange}
                >
                    {optionsPagination.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}
                </Select>
                <span className='flex-1 ml-3 text-left whitespace-nowrap '>of {Math.ceil(count / pageCount)}</span>
            </div>
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
    )
}

export default PaginationCustom