import clsx from 'clsx';
import { FC, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
} & JSX.IntrinsicElements['button'];

export const Button: FC<ButtonProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'primary':
      return <PrimaryButton {...props} />;
    case 'secondary':
      return <SecondaryButton {...props} />;
    case 'tertiary':
      return <TertiaryButton {...props} />;
    default:
      return <PrimaryButton {...props} />;
  }
};

const PrimaryButton: FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return (
    <button
      {...props}
      tabIndex={0}
      className={clsx(
        'h-[2.22rem] px-4 box-border bg-blue-500 rounded-sm text-zinc-50 font-medium focus:outline-none hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 ease-in-out',
        props.className
      )}
    />
  );
};

const SecondaryButton: FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return (
    <button
      {...props}
      tabIndex={0}
      className={clsx(
        'h-[2.22rem] px-4 box-border border border-blue-500 bg-blue-500/0 rounded-sm text-blue-500 font-medium focus:outline-none hover:bg-blue-500/15 active:bg-blue-500/30 transition-colors duration-200 ease-in-out',
        props.className
      )}
    />
  );
};

const TertiaryButton: FC<Omit<ButtonProps, 'variant'>> = (props) => {
  return (
    <button
      {...props}
      tabIndex={0}
      className={clsx(
        'h-[2.2rem] px-4 box-border bg-blue-500/0 rounded-sm text-blue-500 font-medium focus:outline-none hover:bg-blue-500/15 active:bg-blue-500/30 transition-colors duration-200 ease-in-out',
        props.className
      )}
    />
  );
};
