import React from 'react';
import { useForm } from 'react-hook-form';
import { BoxAuthBackground, ButtonFormSubmit, FormGroupCustom } from './StyledAuth';
import { Box, Grid, Stack } from '@mui/material';
import { InputComponent, CheckBoxComponent } from '@/components';
import { Link } from '@material-ui/core';
import Image from 'next/image';
import Logo from '@/assets/img/logo-5.png';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reset, selectAlertState, setAlertState } from '@/lib/slices/AlertSlice';
import AlertComponent from '@/components/Alert';
import Reporting from '@/utils/Reporting';
import { AppState } from '@/lib/store';
import { setAuthState } from '@/lib/slices/AuthSlice';
interface Props {

}
export interface ISignUpRequest {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    telephone: string;
}
const AuthSignUp = (props: Props) => {
    const alertState = useSelector(selectAlertState)
    console.log(alertState)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm<ISignUpRequest>()
    const { push } = useRouter();
    const handleSend = async (data: ISignUpRequest) => {
        try {
            const response = await axios.post("/api/auth/signup", {
                ...data,
                roles: ["ROLE_ADMIN", "ROLE_USER"]
            })
            if (response.data) {
                dispatch(setAlertState({
                    message: response.data.message,
                    show: true,
                    severity: "success",
                }))
                setTimeout(() => {
                    dispatch(reset())
                    push('/auth/signin')
                }, 3 * 1000)
            }

        } catch (error) {
            dispatch(setAlertState({
                message: new Reporting().reportCli(error).message,
                show: true,
                severity: "error",
            }))
        }
    }
    return (
        <BoxAuthBackground>
            <FormGroupCustom onSubmit={handleSubmit(handleSend)}>
                <Grid container>
                    <Grid item sm={12} xs={12} md={12} textAlign={"center"} mb={4}>
                        <Image src={Logo} alt="logo" />
                    </Grid>
                    <Grid item sm={12} md={12} xs={12}>
                        {alertState.show ?
                            (<Stack sx={{ width: '100%' }} mb={2} spacing={2} >
                                <AlertComponent message={alertState.message} show={alertState.show} severity={alertState.severity} />
                            </Stack>)
                            : ''
                        }
                        <Box marginBottom={"2.85rem"}>
                            <InputComponent
                                name='email'
                                label='Email'
                                formState={formState}
                                register={register}
                                options={{ required: true }}
                            />
                        </Box>
                        <Box marginBottom={"2.85rem"}>
                            <InputComponent
                                name='username'
                                label='Username'
                                formState={formState}
                                register={register}
                                options={{ required: true }}
                            />
                        </Box>
                        <Box marginBottom={"3rem"}>
                            <InputComponent
                                name='password'
                                label='Password'
                                type='password'
                                formState={formState}
                                register={register}
                                options={{ required: true }}
                            />
                        </Box>
                        <Box marginBottom={"2.85rem"}>
                            <InputComponent
                                name='firstName'
                                label='First Name'
                                formState={formState}
                                register={register}
                                options={{ required: true }}
                            />
                        </Box>
                        <Box marginBottom={"2.85rem"}>
                            <InputComponent
                                name='lastName'
                                label='Last Name'
                                formState={formState}
                                register={register}
                                options={{ required: true }}
                            />
                        </Box>
                        <Box marginBottom={"2.85rem"}>
                            <InputComponent
                                name='telephon'
                                label='Telephone'
                                formState={formState}
                                register={register}
                                options={{
                                    required: true,
                                    maxLength: {
                                        value: 10,
                                        message: "Max length exceeded"
                                    },
                                    pattern: {
                                        value: /[0-9]/,
                                        message: "Invalid format telephone"
                                    }
                                }}
                            />
                        </Box>

                        <CheckBoxComponent
                            name='agree'
                            label={<span style={{ color: '#6156CE' }}>I agree to all <Link href='#'>Terms</Link></span>}
                            id={'agree'}
                            formState={formState}
                            register={register}
                            options={{ required: true }} value={''} />
                        <ButtonFormSubmit type='submit'>Register</ButtonFormSubmit>
                        <Box color={"#4f5163"} textAlign={"center"} marginTop={'1.8rem'}>
                            <Link href='/auth/signin'>Back</Link>
                        </Box>
                    </Grid>

                </Grid>
            </FormGroupCustom>
        </BoxAuthBackground>
    )
}

export default AuthSignUp