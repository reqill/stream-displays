import { useAppDispatch } from '@renderer/store';
import { saveTemplate } from '@renderer/store/templates';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog } from '../base/Dialog';

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
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </Dialog>
  );
};
