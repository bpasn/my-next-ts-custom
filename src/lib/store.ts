import { configureStore, ThunkAction, Action, AnyAction, Store, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { alertSlice, authSlice, backdropSlice } from './slices';

const combinedReducers = combineReducers({
  alertReducer: alertSlice.reducer,
  authReducer: authSlice.reducer
})
const makeStore = (): Store => {
  return configureStore({
    devTools: true,
    reducer: {
      alertReducer: alertSlice.reducer,
      authReducer: authSlice.reducer,
      backdropReducer: backdropSlice.reducer
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