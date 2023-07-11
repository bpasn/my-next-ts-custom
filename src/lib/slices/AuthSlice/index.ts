'use client';
import { ActionReducerMapBuilder, PayloadAction, SerializedError, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@/lib/store';
import axios from 'axios';
import { IRequest } from '@/pages/auth/signin';
import { IUser } from '@/services/auth/authService';
import useStorage from '@/hook/hookStore';
import { setAlertState } from '../AlertSlice';
import Reporting from '@/utils/Reporting';

export const authAction = createAsyncThunk<IUser, any>('auth/me', async (credential: IRequest, thunkAPI) => {
    try {
        const response = await axios.post<IUser>("http://localhost:3000/api/auth/signin", {
            username: credential.username,
            password: credential.password
        })
        useStorage().setItem("user", JSON.stringify(response.data))
        window.location.href = '/'
        return response.data
    } catch (error) {
        thunkAPI.dispatch(setAlertState({
            message: new Reporting().reportCli(error).message as string,
            severity: "error",
            show: true
        }))
        return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
    }
})

export enum AuthStates {
    IDLE = 'idle',
    LOADING = 'loading',
}
export interface IAuthState {
    loading: AuthStates;
    info?: IUser,
    error?: SerializedError
}
const getUser = (): IUser | undefined => {
    if (typeof window !== "undefined") {
        return useStorage().getItem("testUser", "session") ? JSON.parse(useStorage().getItem("testUser", "session")) : undefined
    }
    return undefined

}
const internalInitialState: IAuthState = {
    loading: AuthStates.IDLE,
    info: getUser(),
}
export const authSlice = createSlice({
    name: "auth",
    initialState: internalInitialState,
    reducers: {
        setAuthState(state, action: PayloadAction<{ token: string }>) {
            return { ...state, accessToken: action.payload.token };
        },
        reset: () => internalInitialState
    },
    extraReducers: (builder: ActionReducerMapBuilder<IAuthState>) => {
        builder.addCase(authAction.pending, (state, action) => {
            return { ...state, loading: AuthStates.LOADING }
        }),
            builder.addCase(authAction.fulfilled, (state, action) => {
                return { ...state, loading: AuthStates.IDLE, info: action.payload }
            }),
            builder.addCase(authAction.rejected, (state, action) => {
                return { ...internalInitialState, loading: AuthStates.IDLE, error: action.error }
            })
    }
})

export const { setAuthState, reset } = authSlice.actions;
export const selectAuth = (state: AppState) => state.authReducer
export default authSlice.reducer