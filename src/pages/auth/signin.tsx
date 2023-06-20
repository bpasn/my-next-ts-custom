import React from 'react'
import { BoxAuthBackground, ButtonFormSubmit, Division, FormControlTextFied, FormGroupCustom, Line, SocialBox } from './StyledAuth';
import { Box, Grid, Link, Typography } from '@mui/material';
import ButtonSocialComponent from '@/components/ButtonSocialComponent';
import InputComponent from '@/components/InputSignComponent';
import CheckBoxComponent from '@/components/CheckBoxComponent';
import { useForm } from 'react-hook-form';

type Props = {}
interface Request {
    username: string;
    password: string;
    checked1: boolean;
}
const SignInPage = (props: Props) => {
    const { register, handleSubmit, formState } = useForm<Request>();
//     const { severity, errorStatus, message } = useAppSelector(state => state.Error);
    // const { loading } = useAppSelector(state => state.SignUser)
//     const dispatch = useAppDispatch();
    const onSubmit = (data: Request) => {
        // dispatch<any>(signIn(data))
    }
    return (
        <BoxAuthBackground>
            <FormGroupCustom onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item sm={12} md={12} textAlign={"center"} mb={4}>
                        {/* <img src={require('../../assets/img/logo-5.png')} alt="logo" /> */}
                    </Grid>
                    <Grid item sm={12} md={12} >
                        {/* <SocialBox>
                            <Typography variant="h5">Sign in with</Typography>
                            <ButtonSocialComponent social='facebook' faIcon='fa-facebook' />
                            <ButtonSocialComponent social='twitter' faIcon='fa-twitter' />
                            <ButtonSocialComponent social='google' faIcon='fa-google-plus' />
                        </SocialBox> */}
                        <Division sx={{
                            marginBottom: "3rem !important",
                            marginTop: "1.5rem !important"
                        }}>
                            <Line side='left' />
                            <span>or</span>
                            <Line side='right' />
                        </Division>
                       
                        <FormControlTextFied marginBottom={"2.85rem"}>
                            <InputComponent
                                formState={formState}
                                options={{
                                    required: true, maxLength: 30, minLength: {
                                        value: 6,
                                        message: "Username requirements: 6 characters or more"
                                    }
                                }}
                                register={register}
                                name={'username'}
                                label='Login' />
                        </FormControlTextFied>
                        <FormControlTextFied marginBottom={"3rem"}>
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
                        </FormControlTextFied>

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
                    <Grid item sm={12} md={12}>
                        <Box textAlign="center">
                            <Box component={"p"} marginTop={"1.5rem"}>New Here? <Link >Register </Link> as new user !</Box>
                        </Box>
                    </Grid>
                </Grid>
            </FormGroupCustom>
        </BoxAuthBackground>
    )
}

export default SignInPage
