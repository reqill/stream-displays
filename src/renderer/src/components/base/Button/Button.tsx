import { FC, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
};

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

const PrimaryButton: FC<Omit<ButtonProps, 'variant'>> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      tabIndex={0}
      className="h-[2.22rem] px-4 box-border bg-blue-500 rounded-sm text-zinc-50 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none hover:bg-blue-600 active:bg-blue-700 active:ring-0 active:ring-offset-0 transition-colors duration-200 ease-in-out"
    >
      {children}
    </button>
  );
};

const SecondaryButton: FC<Omit<ButtonProps, 'variant'>> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      tabIndex={0}
      className="h-[2.22rem] px-4 box-border border border-blue-500 bg-blue-500/0 rounded-sm text-blue-500 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none hover:bg-blue-500/15 active:bg-blue-500/30 active:ring-0 active:ring-offset-0 transition-colors duration-200 ease-in-out"
    >
      {children}
    </button>
  );
};

const TertiaryButton: FC<Omit<ButtonProps, 'variant'>> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      tabIndex={0}
      className="h-[2.2rem] px-4 box-border bg-blue-500/0 rounded-sm text-blue-500 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none hover:bg-blue-500/15 active:bg-blue-500/30 active:ring-0 active:ring-offset-0 transition-colors duration-200 ease-in-out"
    >
      {children}
    </button>
  );
};