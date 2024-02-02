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

export type ApiSend = (
  channel: keyof ApiSendMethods,
  ...args: Parameters<ApiSendMethods[keyof ApiSendMethods]>
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
