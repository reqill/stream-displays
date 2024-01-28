import clsx from 'clsx';
import { ChangeEvent, FC, useId, useState } from 'react';
import { InputContainer } from './InputContainer';
import { InputLabel } from './InputLabel';
import { InputRoot } from './InputRoot';

type CommonTextInputProps = {
  label: string;
  placeholder?: string;
  error?: string | null;
  helperText?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  InputProps?: JSX.IntrinsicElements['input'];
  LabelProps?: JSX.IntrinsicElements['label'];
  ContainerProps?: JSX.IntrinsicElements['div'];
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

export const Input: FC<TextInputProps> = (props) => {
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
    <InputContainer {...props.ContainerProps}>
      <InputLabel htmlFor={id} required={props.required} {...props.LabelProps}>
        {props.label}
      </InputLabel>
      <InputRoot
        id={id}
        type="text"
        value={value}
        onChange={handleOnChange}
        className={clsx(hasError && 'bg-red-500/10')}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        name={props.name}
        {...props.InputProps}
      />

      {hasError && <span className="text-red-500 text-sm pt-[.05rem]">{props.error}</span>}

      {/* TODO: style */}
      {props.helperText && <span>{props.helperText}</span>}
    </InputContainer>
  );
};
