import clsx from 'clsx';
import { ChangeEvent, FC, useId, useState } from 'react';

type CommonTextInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  name?: string;
};

type ControlledTextInputProps = CommonTextInputProps & {
  value: string | null;
  defaultValue?: never;
  onChange: (value: string) => void;
};

type UncontrolledTextInputProps = CommonTextInputProps & {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type TextInputProps = ControlledTextInputProps | UncontrolledTextInputProps;

export const TextInput: FC<TextInputProps> = (props) => {
  const isControlled = props.value !== undefined;
  const propsValue = props.value ?? '';
  const hasError = !!props.error;

  const id = useId();
  const [internalValue, setInternalValue] = useState(
    isControlled ? propsValue : props.defaultValue
  );
  const value: string | undefined = isControlled ? propsValue : internalValue;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setInternalValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm mb-1 mr-auto pl-[.05rem] text-zinc-700 font-medium">
        {props.label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleOnChange}
        className={clsx(
          'px-2 placeholder-zinc-400 text-[.95rem] placeholder:text-[.95rem] text-zinc-800 text-base h-9 border rounded-[5px] box-border bg-gray-50 border-gray-400 focus:outline-none focus:border-blue-500',
          hasError && 'border-red-500'
        )}
        placeholder={props.placeholder}
        disabled={props.disabled}
        name={props.name}
      />
      {hasError && <span>{props.error}</span>}
      {props.helperText && <span>{props.helperText}</span>}
    </div>
  );
};
