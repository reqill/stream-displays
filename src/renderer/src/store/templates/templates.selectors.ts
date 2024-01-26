import { RootState } from '../index';

export const getTemplateById = (templateId: string) => (state: RootState) => {
  return state.templates[templateId];
};
