import type { ApiOnMethods, ApiRemoveListenerMethods, ApiSendMethods } from './index.types';

export const API_SEND_VALID_CHANNELS: Array<keyof ApiSendMethods> = ['open-new-window'];

export const API_ON_VALID_CHANNELS: Array<keyof ApiOnMethods> = [
  'new-window-closed',
  'edit-shortcut-pressed',
];

export const API_REMOVE_LISTENER_VALID_CHANNELS: Array<keyof ApiRemoveListenerMethods> = [
  ...API_ON_VALID_CHANNELS,
];
