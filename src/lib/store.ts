import { configureStore, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { alertSlice } from './slices';

const makeStore = () => {
  return configureStore({
    devTools: true,
    reducer: {
      [alertSlice.name]: alertSlice.reducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore)