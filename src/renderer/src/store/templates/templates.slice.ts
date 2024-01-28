import { createSlice } from '@reduxjs/toolkit';
import { removeTemplate, getAllTemplates, getTemplate } from './templates.thunk';
import { TemplateViewType } from '@renderer/types/templateView.types';

type TemplatesState = {
  // TODO: change to Array<TemplateViewType>
  [key: string]: TemplateViewType;
};

export const TEMPLATES_STORE_SLICE_NAME = 'templates';

const initialState: TemplatesState = {};

export const templatesSlice = createSlice({
  name: TEMPLATES_STORE_SLICE_NAME,
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllTemplates.fulfilled, (state, action) => {
      action.payload.forEach((template: TemplateViewType) => {
        state[template.id] = template;
      });
    });

    builder.addCase(getTemplate.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload;
    });

    builder.addCase(removeTemplate.fulfilled, (state, action) => {
      delete state[action.payload];
    });
  },
});

export default templatesSlice.reducer;
