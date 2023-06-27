import { useAppSelector } from '../../hook/reduxHook'
import { Alert } from '@mui/material'
import React from 'react'

type Props = {
  
} & IAlert

const AlertComponent = (props: Props) => {
  return (
    <Alert severity={props.severity}>
      {props.message}
    </Alert>
  )
}

export default AlertComponent