import { RootState } from '../index';

export const getTemplateByIdSelector = (templateId: string) => (state: RootState) => {
  return state.templates[templateId];
};

export const getAllTemplatesSelector = (state: RootState) => {
  return state.templates;
};
export const getAllTemplatesInArraySelector = (state: RootState) => {
  return Object.values(state.templates);
};
