import React, { useEffect } from 'react';
import { FormState, RegisterOptions, FieldValues, UseFormRegister, FieldPath } from "react-hook-form"
import { Box } from '@mui/material';
import { InputField, LabelForm } from '@/pages/auth/StyledAuth';
interface Props {
    label?: string;
    name: string;
    type?: string,
    marginBottom?: string;
    formState?: FormState<FieldValues>,
    register?: UseFormRegister<any>
    options?: RegisterOptions,
    suffixIcon?: boolean;
    // showPassword?: () => void

}

const InputComponent = ({
    label,
    type = "text",
    name,
    options,
    formState,
    suffixIcon = false,
    register

}: Props) => {
    let err = formState?.errors[name];
    const [show, setShow] = React.useState<boolean>(false)
    const [_type, setType] = React.useState<string>("")


    const handleShow = () => {
        setShow(!show);
    }
    useEffect(() => {
        if (type === 'password' && show) {
            setType("text")
        } else {
            setType(type)
        }
    },[show, type])
    return (
        <div>
            <LabelForm>{label}</LabelForm>
            <Box position="relative" sx={{
                '& i': {
                    position: "absolute",
                    top: "6px",
                    right: "5px",
                    fontSize: "calc(.45rem + 15px)",
                    cursor:"pointer"
                }
            }}>
                {register ? (
                    <InputField type={_type} {...register(name, { ...options })} />
                ) : <InputField name={name} />}
                {suffixIcon ? (<i className={`fa fa-eye${show ? '-slash' : ''}`} onClick={handleShow} />) : ''}
            </Box>
            {err && (
                <span role="alert" style={{ marginTop: "20px" }}>{err.message ? err.message as string : `${name.substring(0, 1).toUpperCase() + name.substring(1)} is required`}</span>
            )}
        </div>
    )
}

export default InputComponent