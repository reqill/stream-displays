import { FC } from 'react';
import { TemplateView } from './TemplateView';
import { TemplateViewType } from '@renderer/types/templateView.types';
import { AddTemplateView } from './AddTemplateView';

type TemplateListProps = {
  templates?: TemplateViewType[];
  activeWindowIds?: string[];
  onAddNewClick: () => void;
  onEditTemplateClick: (template: TemplateViewType) => void;
  onTemplateClick: (template: TemplateViewType) => void;
};

export const TemplateList: FC<TemplateListProps> = ({
  templates,
  activeWindowIds,
  onAddNewClick,
  onTemplateClick,
  onEditTemplateClick,
}) => {
  return (
    <ul className="flex flex-row gap-3 max-w-screen overflow-auto mx-8 pb-4 px-2">
      {templates?.map((template) => (
        <li key={template.id} className="min-w-fit">
          <TemplateView
            template={template}
            onClick={onTemplateClick}
            onEdit={onEditTemplateClick}
            isOpened={activeWindowIds?.includes(template.id)}
          />
        </li>
      ))}
      <li className="min-w-fit">
        <AddTemplateView onClick={onAddNewClick} />
      </li>
    </ul>
  );
};
