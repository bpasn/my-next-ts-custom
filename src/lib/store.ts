import { configureStore, ThunkAction, Action, AnyAction, Store, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { alertSlice, authSlice, backdropSlice } from './slices';

const combinedReducers = combineReducers({
  alertReducer: alertSlice.reducer,
  authReducer: authSlice.reducer
})
const store = configureStore({
  reducer:combinedReducers
})
const makeStore = (): Store => store

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore)