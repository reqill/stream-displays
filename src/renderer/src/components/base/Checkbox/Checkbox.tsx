import clsx from 'clsx';
import { ChangeEvent, FC, useId, useState } from 'react';

type CommonCheckboxProps = {
  label?: string;
  onChange?: (checked: boolean) => void;
  InputProps?: JSX.IntrinsicElements['input'];
  LabelProps?: JSX.IntrinsicElements['label'];
};

type ControlledCheckboxProps = CommonCheckboxProps & {
  checked: boolean;
  defaultChecked?: never;
};

type UncontrolledCheckboxProps = CommonCheckboxProps & {
  checked?: never;
  defaultChecked?: boolean;
};

type CheckboxProps = ControlledCheckboxProps | UncontrolledCheckboxProps;

export const Checkbox: FC<CheckboxProps> = (props) => {
  const isControlled = 'checked' in props;
  const checked = isControlled ? props.checked : props.defaultChecked;

  const [internalChecked, setInternalChecked] = useState(!!checked);
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }

    props.onChange?.(e.target.checked);
  };

  return (
    <label
      {...props.LabelProps}
      className={clsx(
        'flex items-center gap-2 text-zinc-800 select-none w-fit',
        props.LabelProps?.className
      )}
      htmlFor={id}
    >
      <input
        {...props.InputProps}
        id={id}
        type="checkbox"
        checked={isControlled ? checked : internalChecked}
        onChange={handleChange}
        className={clsx(
          'rounded-sm border-zinc-400/75 focus:border-blue-500 focus:outline-none box-border checked:text-blue-500 checked:border-blue-500',
          props.InputProps?.className
        )}
      />
      {props.label}
    </label>
  );
};
