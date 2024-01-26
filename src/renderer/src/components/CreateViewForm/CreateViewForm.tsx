import { useAppDispatch } from '@renderer/store';
import { saveTemplate } from '@renderer/store/templates';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CreateViewForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          dispatch(saveTemplate({ id: uuidv4(), name }));
          setName('');
        }}
      >
        Create
      </button>
    </div>
  );
};
