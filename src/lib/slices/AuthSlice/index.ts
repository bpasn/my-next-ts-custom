// import { createSlice, SerializedError, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios';


// export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get<{ name: string; email: string; type: string }>('api/me') // Call proxy server (api/pages/me.ts)

//         return response.data
//     } catch (error) {
//         return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
//     }
// })


// export const register = createAsyncThunk(
//     'auth/register',
//     async (credentials: { email: string; password: string; name: string }, thunkAPI) => {
//         try {
//             // Register the user with credentials payload (email, password, name)
//             const response = await axios.post<{ accessToken: string }>('api/register', credentials) // Call proxy server (api/pages/register.ts)
//             // If it succeds -> refetch the user 'api/me' so we're logged in automatically after registration.
//             const refetch = await axios.get<{ name: string }>('api/me', {
//                 headers: { Authorization: `Bearer ${response.data.accessToken}` },
//             })
//             // return access token + user data
//             return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
//         } catch (error) {
//             // push error further
//             return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
//         }
//     }
// )

// export const login = createAsyncThunk(
//     'auth/login',
//     async (credentials: { email: string; password: string }, thunkAPI) => {
//         try {
//             const response = await axios.post<{ accessToken: string }>('api/login', credentials)
//             const refetch = await axios.get<{ name: string }>('api/me', {
//                 headers: { Authorization: `Bearer ${response.data.accessToken}` },
//             })
//             return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
//         } catch (error) {
//             return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
//         }
//     }
// )

// export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//     try {
//         const response = await axios.delete<{ accessToken: string }>('api/logout')
//         return response.data
//     } catch (error) {
//         return thunkAPI.rejectWithValue({ error: error instanceof Error && error.message })
//     }
// })


// export enum AuthStates {
//     IDLE = 'idle',
//     LOADING = 'loading',
// }

// export interface AuthSliceState {
//     accessToken: string
//     loading: AuthStates
//     me?: {
//         name?: string
//         email?: string
//     }
//     error?: SerializedError
// }

// // That's what we will store in the auth slice.
// const internalInitialState = {
//     accessToken: '',
//     loading: AuthStates.IDLE,
//     me: null,
//     error: null,
// }

// // createSlice
// export const authSlice = createSlice({
//     name: 'auth', // name of the slice that we will use.
//     initialState: internalInitialState,
//     reducers: {
//         // here will end up non async basic reducers.
//         updateAccessToken(state: AuthSliceState, action: PayloadAction<{ token: string }>) {
//             return { ...state, accessToken: action.payload.token! };
//         },
//         reset: () => internalInitialState,
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUser.rejected, (state, action) => {
//             // 1. Reset state with initial state + add error to state.
//             state = { ...internalInitialState, error: action.error }
//             // 2. VERY IMPORTANT! Throw an error!
//             throw new Error(action.error.message)
//         })
//         builder.addCase(fetchUser.fulfilled, (state, action) => {
//             // Update the state.
//             state.me = action.payload
//             state.loading = AuthStates.IDLE
//         })
//         builder.addCase(register.pending, (state, _action) => {
//             // Update the state.
//             state.loading = AuthStates.LOADING
//         })
//     } // here will end up async more complex reducers.
// })

// // Actions generated automatically by createSlice function
// export const { updateAccessToken, reset } = authSlice.actions