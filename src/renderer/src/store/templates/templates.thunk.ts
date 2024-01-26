import { createAsyncThunk } from '@reduxjs/toolkit';
import { AVAILABLE_TEMPLATES_STORAGE_KEY } from '../../constants/availableTemplates';

const getAvailableTemplates = createAsyncThunk('templates/getAvailableTemplates', async () => {
  const templates = localStorage.getItem(AVAILABLE_TEMPLATES_STORAGE_KEY);
  return templates ? JSON.parse(templates) : [];
});

const addTemplateKeyToStorage = createAsyncThunk(
  'templates/addTemplateKeyToStorage',
  async (templateKey: string, { dispatch }) => {
    const { payload: templateKeys } = await dispatch(getAvailableTemplates());
    if (templateKeys.includes(templateKey)) {
      return;
    }

    templateKeys.push(templateKey);

    localStorage.setItem(AVAILABLE_TEMPLATES_STORAGE_KEY, JSON.stringify(templateKeys));
  }
);

const removeTemplateKeyFromStorage = createAsyncThunk(
  'templates/removeTemplateKeyFromStorage',
  async (templateKey: string, { dispatch }) => {
    const { payload: templateKeys } = await dispatch(getAvailableTemplates());
    if (!templateKeys.includes(templateKey)) {
      return;
    }

    const newTemplateKeys = templateKeys.filter((key: string) => key !== templateKey);

    localStorage.setItem(AVAILABLE_TEMPLATES_STORAGE_KEY, JSON.stringify(newTemplateKeys));
  }
);

const saveTemplate = createAsyncThunk(
  'templates/addTemplate',
  async (template: { id: string; name: string }, { dispatch }) => {
    const { payload: templateKeys } = await dispatch(getAvailableTemplates());

    if (!templateKeys.includes(template.id)) {
      await dispatch(addTemplateKeyToStorage(template.id));
    }

    localStorage.setItem(template.id, JSON.stringify(template));

    dispatch(getTemplate(template.id));
  }
);

const removeTemplate = createAsyncThunk(
  'templates/removeTemplate',
  async (templateKey: string, { dispatch }) => {
    const { payload: templateKeys } = await dispatch(getAvailableTemplates());

    if (templateKeys.includes(templateKey)) {
      await dispatch(removeTemplateKeyFromStorage(templateKey));
    }

    localStorage.removeItem(templateKey);

    return templateKey;
  }
);

const getTemplate = createAsyncThunk(
  'templates/getTemplate',
  async (templateKey: string, { dispatch }) => {
    const { payload: templateKeys } = await dispatch(getAvailableTemplates());

    if (!templateKeys.includes(templateKey)) {
      return null;
    }

    const template = localStorage.getItem(templateKey);

    return template ? JSON.parse(template) : null;
  }
);

const getAllTemplates = createAsyncThunk('templates/getAllTemplates', async (_, { dispatch }) => {
  const { payload: templateKeys } = await dispatch(getAvailableTemplates());

  const templates = templateKeys.map((templateKey: string) => {
    const template = localStorage.getItem(templateKey);

    return template ? JSON.parse(template) : null;
  });

  return templates;
});

export { saveTemplate, removeTemplate, getTemplate, getAllTemplates };
