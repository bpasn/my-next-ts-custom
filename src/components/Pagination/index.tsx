import { Box, Pagination, styled, Theme } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    currentPage?: number,
    shape?: 'circular' | 'rounded'
    itemPerPage: number;
    totalPage: number;
    changePage?: (pageNumber: number) => void;
    onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
    setCurrentPage?: Dispatch<SetStateAction<number>>;
    callBack?: () => void
}

const PaginationComponent: React.FC<Props> = ({ totalPage, itemPerPage, setCurrentPage, shape = "circular", currentPage, onChange }) => {
    const pageNumber = []
    for (let i = 0; i < Math.ceil(totalPage / itemPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination variant={'outlined'} shape={shape} size={'large'} page={currentPage} count={pageNumber.length}
                onChange={onChange} />
        </Box>
    )
}

export default PaginationComponent