import { RootState } from '../index';

export const getAllTemplatesSelector = (state: RootState) => state.templates.templates;
