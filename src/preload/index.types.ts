import type { TemplateViewType } from '../types/templateView.types';

export type ApiSendMethods = {
  'open-new-window': (pathId: string, template: TemplateViewType) => void;
};

export type ApiOnMethods = {
  'new-window-closed': (pathId: string) => void;
};

export type ApiRemoveListenerMethods = {
  'new-window-closed': (pathId: string) => void;
};

export type ApiSend<K extends keyof ApiSendMethods = keyof ApiSendMethods> = (
  channel: K,
  ...args: Parameters<ApiSendMethods[K]>
) => void;

export type ApiOn = (channel: keyof ApiOnMethods, func: ApiOnMethods[keyof ApiOnMethods]) => void;

export type ApiRemoveListener = (
  channel: keyof ApiRemoveListenerMethods,
  func: ApiRemoveListenerMethods[keyof ApiRemoveListenerMethods]
) => void;

export type Api = {
  send: ApiSend;
  on: ApiOn;
  removeListener: ApiRemoveListener;
};
