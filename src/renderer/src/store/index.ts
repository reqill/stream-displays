import { configureStore } from '@reduxjs/toolkit';
import windowsSlice from './windows';
import templatesSlice from './templates';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    windows: windowsSlice,
    templates: templatesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootStateKeys = keyof RootState;
export type RootReducer = typeof store;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
