import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../../store';

// Initial state
export interface IBackdrop {
    show: boolean;
}
const initialState = {
    show: false,
}

// Actual Slice

export const backdropSlice = createSlice({
    name: 'backdrop',
    initialState,
    reducers: {
        //Action To set the alert
        showBackdrop(state, action: PayloadAction<IBackdrop>) {
            state.show = action.payload.show;
        },
        reset: () => initialState
    },

    //Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            //console.log("HYDRATE")
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { showBackdrop, reset } = backdropSlice.actions;
export const selectBackdrop = (state: AppState) => state.backdropReducer

export default backdropSlice.reducer;