import { TemplateViewType } from '@renderer/types/templateView.types';
import { FC, MouseEventHandler } from 'react';
import { TemplateBox } from './TemplateBox';
import { useAppDispatch } from '@renderer/store';
import { removeTemplate } from '@renderer/store/templates';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';

type TemplateViewProps = {
  template: TemplateViewType;
  isOpened?: boolean;
  onClick: (template: TemplateViewType) => void;
};

export const TemplateView: FC<TemplateViewProps> = ({ template, isOpened = false, onClick }) => {
  const dispatch = useAppDispatch();

  const handleDelete: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    dispatch(removeTemplate(template.id));
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
        <span
          onClick={handleDelete}
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
        >
          <TrashIcon className="h-6 w-6 fill-blue-500/30 hover:fill-red-500 transition-colors" />
        </span>
      </div>
    </TemplateBox>
  );
};
