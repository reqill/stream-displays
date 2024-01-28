import clsx from 'clsx';
import { FC } from 'react';

type InputRootProps = JSX.IntrinsicElements['input'];

export const InputRoot: FC<InputRootProps> = (props) => {
  return (
    <input
      {...props}
      className={clsx(
        'px-2 py-[.3rem] placeholder-zinc-400 text-[.95rem] placeholder:text-[.95rem] text-zinc-800 text-base bg-transparent border rounded-sm box-border border-zinc-400/75 focus:outline-none focus:border-blue-500',
        props.className
      )}
    />
  );
};
