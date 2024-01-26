import { FC, ReactNode } from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';

type ButtonProps = {
  onClick: () => void;
  text?: string;
};

type DialogProps = {
  open?: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  SaveButtonProps?: ButtonProps;
};

export const Dialog: FC<DialogProps> = ({
  children,
  open,
  title,
  description,
  onClose,
  SaveButtonProps,
}) => {
  return (
    <HeadlessDialog onClose={onClose} open={open} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <HeadlessDialog.Panel className="w-full max-w-sm rounded bg-zinc-50">
          {title && <HeadlessDialog.Title>Create new view</HeadlessDialog.Title>}
          {description && <HeadlessDialog.Description>{description}</HeadlessDialog.Description>}

          {children}

          <button onClick={() => onClose()}>Close</button>
          {SaveButtonProps && (
            <button onClick={SaveButtonProps.onClick}>{SaveButtonProps?.text || 'Save'}</button>
          )}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
};
