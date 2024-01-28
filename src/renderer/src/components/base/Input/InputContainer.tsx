import clsx from 'clsx';
import { FC } from 'react';

type InputContainerProps = JSX.IntrinsicElements['div'];

export const InputContainer: FC<InputContainerProps> = (props) => {
  return <div {...props} className={clsx('flex flex-col', props.className)} />;
};
