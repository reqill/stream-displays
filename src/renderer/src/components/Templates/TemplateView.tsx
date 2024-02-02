import { FC, MouseEventHandler } from 'react';
import { TemplateBox } from './TemplateBox';
import { useAppDispatch } from '@renderer/store';
import { removeTemplate } from '@renderer/store/templates';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import EditIcon from '@heroicons/react/20/solid/PencilIcon';
import { TemplateViewType } from 'src/types/templateView.types';

type TemplateViewProps = {
  template: TemplateViewType;
  isOpened?: boolean;
  onClick: (template: TemplateViewType) => void;
  onEdit: (template: TemplateViewType) => void;
};

export const TemplateView: FC<TemplateViewProps> = ({
  template,
  isOpened = false,
  onClick,
  onEdit,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    // TODO: close if opened as well
    dispatch(removeTemplate(template.id));
  };

  const handleEdit: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    onEdit(template);
  };

  return (
    <TemplateBox borderStyle="solid">
      <div
        className="flex flex-grow flex-col justify-center align-middle relative cursor-default group"
        onClick={() => onClick(template)}
      >
        <h3 className="text-2xl font-semibold text-gray-100 pb-[2px] mx-auto">{template.name}</h3>
        {isOpened && (
          <span className="h-2 w-2 absolute rounded-full bg-blue-500 top-2 right-2 animate-bounce" />
        )}
        <div className="absolute bottom-2 w-min right-2 flex flex-row gap-2 justify-end align-middle">
          <span
            onClick={handleDelete}
            className="m-auto opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            <TrashIcon className="h-6 w-6 fill-blue-500/30 hover:fill-red-500 transition-colors" />
          </span>
          <span
            className="opacity-0 m-auto group-hover:opacity-100 cursor-pointer transition-opacity"
            onClick={handleEdit}
          >
            <EditIcon className="h-6 w-6 fill-blue-500/30 hover:fill-blue-500 transition-colors" />
          </span>
        </div>
      </div>
    </TemplateBox>
  );
};
