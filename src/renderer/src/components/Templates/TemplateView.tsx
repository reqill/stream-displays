import { TemplateViewType } from '@renderer/types/templateView.types';
import { FC } from 'react';
import { TemplateBox } from './TemplateBox';

type TemplateViewProps = {
  template: TemplateViewType;
  isOpened?: boolean;
};

export const TemplateView: FC<TemplateViewProps> = ({ template, isOpened = false }) => {
  return (
    <TemplateBox borderStyle="solid">
      <div className="flex flex-grow flex-col justify-center align-middle relative cursor-default">
        <h3 className="text-2xl font-semibold text-gray-100 pb-[2px] mx-auto">{template.name}</h3>
        {isOpened && (
          <span className="h-2 w-2 absolute rounded-full bg-blue-500 top-2 right-2 animate-pulse" />
        )}
      </div>
    </TemplateBox>
  );
};
