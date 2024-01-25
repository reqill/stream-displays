import { configureStore } from '@reduxjs/toolkit';
import windowsReducer from './windows';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    windows: windowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootStateKeys = keyof RootState;
export type RootReducer = typeof store;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
