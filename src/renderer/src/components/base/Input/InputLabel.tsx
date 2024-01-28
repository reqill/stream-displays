import clsx from 'clsx';
import { FC } from 'react';

type InputLabelProps = { required?: boolean } & JSX.IntrinsicElements['label'];

export const InputLabel: FC<InputLabelProps> = (props) => {
  return (
    <label
      {...props}
      className={clsx(
        'text-sm mb-1 mr-auto pl-[.05rem] text-zinc-700 font-medium',
        props.className
      )}
    >
      {props.children}
      {!props.required && <span className="text-zinc-400/75 ml-2 font-normal">(optional)</span>}
    </label>
  );
};
