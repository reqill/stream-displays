import { RootState } from '../index';

export const getOpenenedWindowsSelector = (state: RootState) => state.windows.openedWindows;
