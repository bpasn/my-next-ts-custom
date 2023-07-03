import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../../store';

// Initial state

const initialState: IAlert = {
    message: '',
    show: false,
    severity: 'error'
}

// Actual Slice

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        //Action To set the alert
        setAlertState(state, action: PayloadAction<IAlert>) {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.show = action.payload.show;
        },
        reset: () => initialState
    },

    //Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setAlertState,reset } = alertSlice.actions;
export const selectAlertState = (state: AppState) => state.alertReducer

export default alertSlice.reducer;