import React from 'react'
import { BoxAuthBackground, ButtonFormSubmit, Division, FormGroupCustom, Line, SocialBox } from './StyledAuth';
import { Box, Grid, Link, Typography } from '@mui/material';
import ButtonSocialComponent from '@/components/ButtonSocialComponent';
import InputComponent from '@/components/InputSignComponent';
import CheckBoxComponent from '@/components/CheckBoxComponent';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Logo from '../../assets/img/logo-5.png';
import axios from 'axios';
import { useRouter } from 'next/router';
type Props = {}
interface Request {
    username: string;
    password: string;
    checked1: boolean;
}
const AuthSignIn = (props: Props) => {
    const { register, handleSubmit, formState } = useForm<Request>({
        mode: "onChange"
    });
    const { push } = useRouter()
    const onSubmit = async (data: Request) => {
        try {
            const result = await axios.post('/api/auth/signin', data)
            if (result.data.success) {
                push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <BoxAuthBackground>
            <FormGroupCustom onSubmit={handleSubmit(onSubmit)}>
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
