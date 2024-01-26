import { FC } from 'react';
import { TemplateView } from './TemplateView';
import { TemplateViewType } from '@renderer/types/templateView.types';
import { AddTemplateView } from './AddTemplateView';

export const TemplateList: FC = () => {
  const templates: (TemplateViewType | null)[] = [
    {
      id: '1',
      name: 'Template 1',
    },
    {
      id: '2',
      name: 'Template 2',
    },
    null,
  ];

  return (
    <ul className="flex flex-row gap-3">
      {templates.map((template) => (
        <li key={template?.id || 'ADD_NEW'}>
          {template ? (
            <TemplateView template={template} isOpened={template.id === '2'} />
          ) : (
            <AddTemplateView />
          )}
        </li>
      ))}
    </ul>
  );
};
