import { createSlice } from '@reduxjs/toolkit';
import { removeTemplate, getAllTemplates, getTemplate } from './templates.thunk';

type TemplatesState = {
  [key: string]: { id: string; name: string };
};

export const TEMPLATES_STORE_SLICE_NAME = 'templates';

const initialState: TemplatesState = {};

export const templatesSlice = createSlice({
  name: TEMPLATES_STORE_SLICE_NAME,
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllTemplates.fulfilled, (state, action) => {
      action.payload.forEach((template: { id: string; name: string }) => {
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
