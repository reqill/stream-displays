import { is } from '@electron-toolkit/utils';
import { join } from 'path';

export const getUrl = (path = '') =>
  is.dev && process.env['ELECTRON_RENDERER_URL']
    ? `${process.env['ELECTRON_RENDERER_URL']}#/${path}`
    : `file://${join(__dirname, '../renderer/index.html')}#/${path}`;
