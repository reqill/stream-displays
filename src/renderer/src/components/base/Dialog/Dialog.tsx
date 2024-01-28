import { FC, ReactNode } from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { Button } from '../Button';

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
      <HeadlessDialog.Backdrop className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <HeadlessDialog.Panel className="w-full max-w-sm rounded-md bg-zinc-50 pb-4">
          <div className="px-4 py-3 bg-zinc-100 rounded-t-md">
            {title && (
              <HeadlessDialog.Title className="font-semibold text-xl text-zinc-700">
                Create new view
              </HeadlessDialog.Title>
            )}
            {description && <HeadlessDialog.Description>{description}</HeadlessDialog.Description>}
          </div>

          <div className="h-[1px] bg-zinc-200 w-full mb-3" />

          <div className="px-4">{children}</div>

          <div className="flex flex-row justify-end gap-2 px-4 mt-5">
            <Button onClick={onClose} variant="secondary">
              Close
            </Button>
            {SaveButtonProps && (
              <Button onClick={SaveButtonProps.onClick}>{SaveButtonProps?.text || 'Save'}</Button>
            )}
          </div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
};
