import { useAppDispatch } from '@renderer/store';
import { saveTemplate } from '@renderer/store/templates';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog } from '../base/Dialog';
import { TextInput } from '../base/TextInput';

type CreateViewFormProps = {
  open?: boolean;
  onClose: () => void;
};

export const CreateViewForm: FC<CreateViewFormProps> = ({ onClose, open }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  const handleSave = async () => {
    await dispatch(saveTemplate({ id: uuidv4(), name })).unwrap();
    setName('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Create new view"
      SaveButtonProps={{ onClick: handleSave }}
    >
      <TextInput
        label="Name"
        name="view_name"
        value={name}
        onChange={setName}
        placeholder="Enter view name"
      />
    </Dialog>
  );
};
