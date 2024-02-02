import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type { Api } from './index.types';
import {
  API_ON_VALID_CHANNELS,
  API_REMOVE_LISTENER_VALID_CHANNELS,
  API_SEND_VALID_CHANNELS,
} from './index.constants';

const api: Api = {
  send: (channel, ...args) => {
    if (API_SEND_VALID_CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },

  on: (channel, func: (...args: any[]) => void) => {
    if (API_ON_VALID_CHANNELS.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    }
  },

  removeListener: (channel, func: (...args: any[]) => void) => {
    if (API_REMOVE_LISTENER_VALID_CHANNELS.includes(channel)) {
      ipcRenderer.removeListener(channel, (_event, ...args) => func(...args));
    }
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
