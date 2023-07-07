import { DataGridComponent } from '@/components'
import { GridColDef } from '@mui/x-data-grid'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoIssueClosed } from 'react-icons/go'
import React from 'react'
import { Box } from '@mui/material';
import Image from 'next/image';
import { FaPencil } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
type Props = {}
const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70, sortable: false },
  {
    hideSortIcons: true, sortable: true, field: "imagePath", headerName: "Image", width: 70, renderCell(row) {
      return (
        <Box boxShadow={"1px 2px rgba(151,151,152,11)"} borderRadius={"10px"}>
          <Image style={{ borderRadius: "10px", height: "50px", objectFit: "cover" }} loader={() => "http://localhost:8888" + row.value.replace("src/main/resources/storage","")} src={"http://localhost:8888" + row.value.replace("src/main/resources/storage","")} width={100} height={100} alt={''} />
        </Box>
      )
    }
  },
  { field: "categoryName", headerName: "Category Name", maxWidth: 140, flex: 1 },
  { field: "categoryDescription", headerName: "Descriptions", maxWidth: 150 ,flex:1},
  {
    hideSortIcons: true, sortable: true, field: "active", headerName: "Status", width: 70,
    align: "center",
    renderCell(row) {
      return row.row.id % 2 === 0 ? <AiOutlineCloseCircle className="text-red-500 font-bold text-[24px]" /> : <GoIssueClosed className="text-blue-500 font-bold text-[24px]" />
    }
  },
  {
    flex: 1,
    align:"center",
    field: "", headerName: "Action", renderCell: () => {
      return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"20px"}>
          <FaPencil className=' text-gray-500 font-bold text-[24px] cursor-pointer' onClick={() => console.log("Edit")} />
          <RiDeleteBin6Line className='text-gray-500  font-bold text-[24px] cursor-pointer' onClick={() => console.log("Delete")} />
        </Box>
      )
    }
  }
]
const Categories = (props: Props) => {
  return (
    <div className="overflow-auto">
      <DataGridComponent
        url='/api/categories/get-all'
        columns={columns}
      />
    </div>
  )
}

export default Categories