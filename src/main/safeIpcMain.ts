import { ipcMain, IpcMainEvent } from 'electron';
import { ApiSendMethods } from '../preload/index.types';

type SendMethodParams<T extends keyof ApiSendMethods> = Parameters<ApiSendMethods[T]>;

const typedIpcMainOn = <T extends keyof ApiSendMethods>(
  channel: T,
  listener: (event: IpcMainEvent, ...args: SendMethodParams<T>) => void
) => {
  ipcMain.on(channel, (event, ...args) => {
    listener(event, ...(args as SendMethodParams<T>));
  });
};

export const safeIpcMain = {
  ...ipcMain,
  on: typedIpcMainOn,
};
