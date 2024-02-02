import { createSlice } from '@reduxjs/toolkit';
import { removeTemplate, getAllTemplates, getTemplate } from './templates.thunk';
import { TemplateViewType } from 'src/types/templateView.types';

type TemplatesState = {
  templates: TemplateViewType[];
};

export const TEMPLATES_STORE_SLICE_NAME = 'templates';

const initialState: TemplatesState = {
  templates: [],
};

export const templatesSlice = createSlice({
  name: TEMPLATES_STORE_SLICE_NAME,
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllTemplates.fulfilled, (state, action) => {
      state.templates = action.payload;
    });

    builder.addCase(getTemplate.fulfilled, (state, action) => {
      const template = action.payload;
      const index = state.templates.findIndex((t) => t.id === template.id);

      if (index === -1) {
        state.templates.push(template);
      } else {
        state.templates[index] = template;
      }
    });

    builder.addCase(removeTemplate.fulfilled, (state, action) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload);
    });
  },
});

export default templatesSlice.reducer;
