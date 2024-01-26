import { TemplateBox } from './TemplateBox';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

export const AddTemplateView = () => {
  return (
    <TemplateBox borderStyle="dashed">
      <div className="flex flex-grow justify-center align-middle pb-[2px] cursor-pointer">
        <PlusIcon className="h-10 m-auto fill-blue-500" />
      </div>
    </TemplateBox>
  );
};
