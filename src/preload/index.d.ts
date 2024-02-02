import { ElectronAPI } from '@electron-toolkit/preload';
import type { Api } from './index.types';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}
