import { FC } from 'react';
import { TemplateBox } from './TemplateBox';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

type AddTemplateViewProps = {
  onClick: () => void;
};

export const AddTemplateView: FC<AddTemplateViewProps> = ({ onClick }) => {
  return (
    <TemplateBox borderStyle="dashed">
      <div
        className="flex flex-grow flex-col justify-center align-middle pb-[2px] cursor-pointer"
        onClick={onClick}
      >
        <PlusIcon className="h-10 mx-auto fill-blue-500 pt-1" />
        <p className="mx-auto mt-0 text-blue-500 text-sm">create new view</p>
      </div>
    </TemplateBox>
  );
};
