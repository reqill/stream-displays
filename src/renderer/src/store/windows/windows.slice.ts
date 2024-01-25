import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type WindowsState = {
  // TODO: Decide if we want to store it in array or object
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

    // @eslint-ignore-next-line @typescript-eslint/no-unused-vars
    focusWindow: (_state, _action) => {
      // TODO: Decide if implement or leave this logic in the main process
    },

    closeWindow: (state, action) => {
      delete state.openedWindows[action.payload];
    },
  },
});

export const { openWindow, focusWindow, closeWindow } = windowsSlice.actions;

export default windowsSlice.reducer;
