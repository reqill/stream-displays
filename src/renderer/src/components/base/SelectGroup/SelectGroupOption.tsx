import clsx from 'clsx';
import { ReactNode } from 'react';

export type SelectGroupOptionProps<Value> = {
  onClick?: () => void;
  selected?: boolean;
  value: Value;
  first?: boolean;
  last?: boolean;
  children: ReactNode;
  className?: JSX.IntrinsicElements['div']['className'];
};

export const SelectGroupOption = <Value extends unknown>(props: SelectGroupOptionProps<Value>) => {
  return (
    <div
      role="checkbox"
      tabIndex={0}
      onClick={props.onClick}
      className={clsx(
        'gap-2 select-none min-w-fit bg-zinc-50 px-3 py-[.3rem] flex-grow text-center cursor-pointer hover:bg-blue-100/65 transition-colors',
        props.selected ? 'text-blue-500 hover:bg-blue-200/70  bg-blue-200/70' : 'text-zinc-700',
        props.first ? 'rounded-l-sm' : '',
        props.last ? 'rounded-r-sm' : '',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
