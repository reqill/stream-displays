import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

type TemplateBoxProps = {
  borderStyle: 'dashed' | 'solid';
  children: ReactNode;
};

export const TemplateBox: FC<TemplateBoxProps> = ({ children, borderStyle }) => {
  return (
    <div
      className={clsx(
        'border-2 border-blue-500 flex h-32 aspect-[16/10] rounded-md  bg-blue-500/0 hover:bg-blue-500/15 transition-colors active:bg-blue-600/30',
        borderStyle === 'dashed' ? 'border-dashed' : 'border-solid'
      )}
    >
      {children}
    </div>
  );
};
