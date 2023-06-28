import { ActionReducerMapBuilder, PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '@/lib/store';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { IRequest } from '@/pages/auth/signin';

export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    try {
        const response = await axios.get("/api/auth/signin");

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
    }
})

export const login = createAsyncThunk('auth/login', async (credentials:IRequest, thunkAPI) => {
    try {
        const signin = await signIn("SignIn", { ...credentials, redirect: false });
        if (signin?.error) {
            return thunkAPI.rejectWithValue({ error: signin.error })
        }
        return signin
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
    }
})
export enum AuthStates {
    IDLE = 'idle',
    LOADING = 'loading',
}
export interface IAuthState {
    accessToken: string;
    loading: AuthStates;
    me?: {
        name?: string;
        email?: string;
    };
    error?: SerializedError
}

const internalInitialState: IAuthState = {
    accessToken: '',
    loading: AuthStates.IDLE,
    me: undefined,
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
            state.me = action.payload;
            state.loading = AuthStates.IDLE
        });
        // builder.addCase(register.pending,(state))
    }
})

export const { setAuthState, reset } = authSlice.actions;