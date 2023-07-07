'use client';
import React, { useState } from 'react'
import { BoxAuthBackground, ButtonFormSubmit, Division, FormGroupCustom, Line, SocialBox } from './StyledAuth';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Logo from '@/assets/img/logo-5.png';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { BackDrop, ButtonSocialComponent, CheckBoxComponent, InputComponent } from '@/components'
import { useDispatch, useSelector } from 'react-redux';
import { reset, selectAlertState, setAlertState } from '@/lib/slices/AlertSlice';
import AlertComponent from '@/components/Alert';
import Backdrop, { showBackdrop } from '@/lib/slices/Backdrop';
import { login } from '@/lib/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '@/hook/reduxHook';
type Props = {}
export interface IRequest {
    username: string;
    password: string;
    checked1: boolean;
}
const AuthSignIn = (props: Props) => {
    const alertState = useSelector(selectAlertState)
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm<IRequest>({
        mode: "onChange"
    });
    const { push } = useRouter()
    const onSubmit = async (data: IRequest) => {
        dispatch(reset())
        signIn("SignIn", {
            username: data.username,
            password: data.password,
            redirect: false
        }).then(response => {
            setLoading(false)
            if (response?.error) {

                dispatch(setAlertState({
                    message: response.error,
                    show: true,
                    severity: "error",
                }))
            } else {
                push("/")
                dispatch(reset())
            }
        }).catch(() => setLoading(false))
    }
    return (
        <BoxAuthBackground>
            <FormGroupCustom onSubmit={handleSubmit(data => {
                setLoading(true)
                setTimeout(() => {
                    onSubmit(data)
                }, 1.5 * 1000)
            })}>
               {loading && <BackDrop/>}
                <Grid container>
                    <Grid item sm={12} xs={12} md={12} textAlign={"center"} mb={4}>
                        <Image src={Logo} alt="logo" />
                    </Grid>
                    <Grid item sm={12} xs={12} md={12} >
                        <SocialBox>
                            <Typography variant="h5">Sign in with</Typography>
                            <ButtonSocialComponent social='facebook' faIcon='fa-facebook' />
                            <ButtonSocialComponent social='twitter' faIcon='fa-twitter' />
                            <ButtonSocialComponent social='google' faIcon='fa-google-plus' />
                        </SocialBox>
                        <Division sx={{
                            marginBottom: "3rem !important",
                            marginTop: "1.5rem !important"
                        }}>
                            <Line side='left' />
                            <span>or</span>
                            <Line side='right' />
                        </Division>
                        {alertState.show ?
                            (<Stack sx={{ width: '100%' }} mb={2} spacing={2} >
                                <AlertComponent message={alertState.message} show={alertState.show} severity={alertState.severity} />
                            </Stack>)
                            : ''
                        }
                        <Box marginBottom={"2.85rem"}>
                            <InputComponent
                                formState={formState}
                                options={{
                                    required: {
                                        value: true,
                                        message: "Field Is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Username requirements: 6 characters or more"
                                    }
                                }}
                                register={register}
                                name={'username'}
                                label='Login' />
                        </Box>
                        <Box marginBottom={"3rem"}>
                            <InputComponent
                                type='password'
                                suffixIcon={true}
                                formState={formState}
                                options={{
                                    required: true,
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                                        message: "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
                                    }
                                }}
                                register={register}
                                name={'password'}
                                label='Password' />
                        </Box>

                        <Box display={"flex"} justifyContent={"space-between"} mb={"1.5rem"} mt={"1rem"}>
                            <CheckBoxComponent
                                id='checkbox1'
                                label='Remember me'
                                value=''
                                name={'checkbox1'}
                            />
                            <Box textAlign="center" color={"#5247bd"}>
                                <Link>Forgot Password ?</Link>
                            </Box>
                        </Box>
                        <ButtonFormSubmit disableTouchRipple type='submit'>Sign in</ButtonFormSubmit>

                    </Grid>
                    <Grid item sm={12} xs={12} md={12}>
                        <Box textAlign="center">
                            <Box component={"p"} color={"#5247bd"} marginTop={"1.5rem"}>New Here? <Link href='/auth/signup'>Register </Link> as new user !</Box>
                        </Box>
                    </Grid>
                </Grid>
            </FormGroupCustom>
        </BoxAuthBackground>
    )
}

export default AuthSignIn
