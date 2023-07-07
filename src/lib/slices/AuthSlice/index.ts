'use client';
import { ActionReducerMapBuilder, PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '@/lib/store';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { IRequest } from '@/pages/auth/signin';
import AuthService, { IUser } from '@/services/auth/authService';
import { useDispatch } from 'react-redux';

export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    try {
        const response = await axios.get("/api/auth/signin");
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
    }
})

export const login  = createAsyncThunk('auth/login', async (credentials: IRequest, thunkAPI) =>  {
    const response = await axios.post("http://localhost:3000/api/auth/signin", {
        username: credentials.username,
        password: credentials.password
    })
    return response.data
    // try {

    // } catch (error) {
    //     // return thunkAPI.rejectWithValue(axios.isAxiosError(error) && error.response?.data.message)
    // }
})
export enum AuthStates {
    IDLE = 'idle',
    LOADING = 'loading',
}
export interface IAuthState {
    accessToken: string;
    loading: AuthStates;
    info?: IUser,
    error?: SerializedError
}

const internalInitialState: IAuthState = {
    accessToken: '',
    loading: AuthStates.IDLE,
    info: undefined,
    error: undefined
}
export const authSlice = createSlice({
    name: "auth",
    initialState: internalInitialState,
    reducers: {
        //Action to set the authication status
        setAuthState(state, action: PayloadAction<{ token: string }>) {
            return { ...state, accessToken: action.payload.token };
        },
        reset: () => internalInitialState
    },
    extraReducers: (builder: ActionReducerMapBuilder<IAuthState>) => {
        builder.addCase(fetchUser.rejected, (state, action) => {
            //1 Reset State with initial state + add error to state.
            state = { ...internalInitialState, error: action.error };
            throw new Error(action.error.message)
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.info = action.payload;
            state.loading = AuthStates.IDLE
        });
        builder.addCase(login.rejected, (state, action) => {
            return state = { ...internalInitialState, error: { message: action.error.message}, loading: AuthStates.IDLE };
        })
        builder.addCase(login.pending, (state, action) => {
           state.loading = AuthStates.LOADING;
           return state;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = AuthStates.IDLE
            state.info = action.payload
            return state;
        })
        // builder.addCase(register.pending,(state))
    }
})

export const { setAuthState, reset } = authSlice.actions;
export const selectAuth = (state:AppState) => state.authReducer
export default authSlice.reducer