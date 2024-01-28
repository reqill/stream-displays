import { SelectGroup as InternalSelectGroup } from './SelectGroup';
import { SelectGroupOption } from './SelectGroupOption';

export const SelectGroup = Object.assign(InternalSelectGroup, {
  Option: SelectGroupOption,
});
