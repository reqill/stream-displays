import {
  Children,
  ReactElement,
  cloneElement,
  createElement,
  isValidElement,
  useMemo,
  useState,
} from 'react';
import { SelectGroupOptionProps } from './SelectGroupOption';

type CommonSelectGroupProps<Value> = {
  children?:
    | ReactElement<SelectGroupOptionProps<Value>>
    | ReactElement<SelectGroupOptionProps<Value>>[];
  selected?: Value;
  defaultSelected?: Value;
  onChange?: (value: Value) => void;
};

type ControlledSelectGroupProps<Value> = CommonSelectGroupProps<Value> & {
  selected: Value;
  defaultSelected?: never;
};

type UncontrolledSelectGroupProps<Value> = CommonSelectGroupProps<Value> & {
  selected?: never;
  defaultSelected: Value;
};

type SelectGroupProps<Value> =
  | ControlledSelectGroupProps<Value>
  | UncontrolledSelectGroupProps<Value>;

export const SelectGroup = <Value extends unknown>(props: SelectGroupProps<Value>) => {
  const isControlled = 'selected' in props;
  const selected = isControlled ? props.selected : props.defaultSelected;

  const [internalSelected, setInternalSelected] = useState<Value | undefined>(selected);

  const handleChange = (value: Value) => {
    if (!isControlled) {
      setInternalSelected(value);
    }

    props.onChange?.(value);
  };

  const children = useMemo(
    () =>
      Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            onClick: () => handleChange(child.props.value),
            selected: child.props.value === (isControlled ? selected : internalSelected),
          });
        }

        return null;
      })?.filter(Boolean),
    [props.children, isControlled, selected, internalSelected]
  );

  return (
    <div className="flex flex-row w-full gap-px rounded-sm border justify-center bg-zinc-300 align-middle border-zinc-300">
      {children?.map((child, i) => (
        <>
          {createElement(child.type, {
            ...child.props,
            first: i === 0,
            last: i === children.length - 1,
          })}
        </>
      ))}
    </div>
  );
};
