import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type WindowsState = {
  openedWindows: { [key: string]: boolean };
};

export const WINDOWS_STORE_SLICE_NAME = 'windows';

const initialState: WindowsState = {
  openedWindows: {},
};

export const windowsSlice = createSlice({
  name: WINDOWS_STORE_SLICE_NAME,
  initialState,

  reducers: {
    openWindow: (state, action: PayloadAction<string>) => {
      state.openedWindows[action.payload] = true;
    },

    closeWindow: (state, action) => {
      delete state.openedWindows[action.payload];
    },
  },
});

export const { openWindow, closeWindow } = windowsSlice.actions;

export default windowsSlice.reducer;
