import React from 'react'
import { Box } from '@mui/material'
import { FormState, RegisterOptions, FieldValues, UseFormRegister } from "react-hook-form"
import { CheckBoxCustom, CustomBox, LabelCustom } from '@/pages/auth/StyledAuth';

type Props = {
    id: string;
    name: string;
    color?: string;
    label?: React.ReactNode | React.ReactElement | JSX.Element | JSX.Element[];
    value: string;
    formState?: FormState<FieldValues>,
    register?: UseFormRegister<any>
    options?: RegisterOptions<FieldValues, any>
}

const CheckBoxComponent = ({ value, label, id, options,
    formState,
    name,
    color = '#3b3f5c',
    register }: Props) => {
    let err = formState?.errors[name];
    let ref = err?.ref as HTMLInputElement;
    return (
        <Box marginBottom="1rem">
            <Box display={"flex"} justifyContent={"center"} >
                <CustomBox sx={{
                    marginRight: "1rem"
                }}>
                    <CheckBoxCustom {...register?.(name, { ...options })} id={id} type='checkbox' />
                    <LabelCustom color={color}  error={(err && ref && !ref.checked) ? true : false} htmlFor={id}>{label}</LabelCustom>
                </CustomBox>
            </Box>
        </Box>
    )
}

export default CheckBoxComponent