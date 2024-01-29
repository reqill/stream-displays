import { useAppDispatch } from '@renderer/store';
import { saveTemplate } from '@renderer/store/templates';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog } from '../base/Dialog';
import { Input } from '../base/Input';
import { InputContainer } from '../base/Input/InputContainer';
import { InputLabel } from '../base/Input/InputLabel';
import { InputRoot } from '../base/Input/InputRoot';
import { getRandomName } from '@renderer/utils/getRandomName';
import { Checkbox } from '../base/Checkbox';
import { SelectGroup } from '../base/SelectGroup';
import { Button } from '../base/Button';

type CreateViewFormProps = {
  open?: boolean;
  onClose: () => void;
};

type SupportedAspectRatio = 'Off' | '16/9' | '16/10' | '4/3';

// TODO: make this available in /constants and use it also in main window creation
const DEFAULT_WIDTH = 900;
const DEFAULT_HEIGHT = 670;

// TODO: propably same as above
// const MIN_WIDTH = 150;
// const MIN_HEIGHT = 115;

export const CreateViewForm: FC<CreateViewFormProps> = ({ onClose, open }) => {
  const dispatch = useAppDispatch();
  // TODO: propably handle with formik
  const [name, setName] = useState('');
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [resizeable, setResizeable] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [funnyPlaceholder, setFunnyplaceholder] = useState(getRandomName);
  const [aspectRatio, setAspectRatio] = useState<SupportedAspectRatio>('Off');

  useEffect(() => {
    if (open) {
      setFunnyplaceholder(getRandomName);
    }
  }, [open]);

  const handleSave = async () => {
    if (!name) {
      setErrorMessage('Name is required');
      return;
    }

    await dispatch(
      saveTemplate({
        id: uuidv4(),
        name,
        resolution: { width, height },
        resizeable,
      })
    ).unwrap();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setWidth(DEFAULT_WIDTH);
    setHeight(DEFAULT_HEIGHT);
    setErrorMessage(null);
    setResizeable(false);
    setAspectRatio('Off');
  };

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const handleNameChange = (value: string) => {
    if (errorMessage) {
      setErrorMessage(null);
    }

    setName(value);
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (aspectRatio !== 'Off') {
      const [wFactor, hFactor] = aspectRatio.split('/').map((v) => +v);

      setHeight(Math.floor(value * (hFactor / wFactor)));
    }
    setWidth(value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (aspectRatio !== 'Off') {
      const [wFactor, hFactor] = aspectRatio.split('/').map((v) => +v);

      setWidth(Math.floor(value * (wFactor / hFactor)));
    }

    setHeight(value);
  };

  const handleAspectRatioChange = (value: SupportedAspectRatio) => {
    setAspectRatio(value);

    if (value === 'Off') {
      return;
    }

    const [wFactor, hFactor] = value.split('/').map((v) => +v);

    setHeight(Math.floor(width * (hFactor / wFactor)));
  };

  const handleSetDefaultResolution = () => {
    setAspectRatio('Off');
    setWidth(DEFAULT_WIDTH);
    setHeight(DEFAULT_HEIGHT);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Create new view"
      SaveButtonProps={{ onClick: handleSave }}
    >
      <div className="flex flex-col gap-3">
        <Input
          required
          label="Name"
          name="view_name"
          value={name}
          onChange={handleNameChange}
          error={errorMessage}
          placeholder={`e.g. ${funnyPlaceholder}`}
        />

        <InputContainer>
          <InputLabel required>Force aspect ratio</InputLabel>
          <SelectGroup onChange={handleAspectRatioChange} selected={aspectRatio}>
            <SelectGroup.Option value="Off">Off</SelectGroup.Option>
            <SelectGroup.Option value="16/9">16:9</SelectGroup.Option>
            <SelectGroup.Option value="16/10">16:10</SelectGroup.Option>
            <SelectGroup.Option value="4/3">4:3</SelectGroup.Option>
          </SelectGroup>
        </InputContainer>

        <InputContainer>
          <InputLabel required>Resolution</InputLabel>
          <div className="flex flex-row gap-2">
            <InputRoot
              placeholder="width"
              name="width"
              required
              className="w-24"
              value={width}
              onChange={handleWidthChange}
            />
            <span className="my-auto pb-1 select-none">x</span>
            <InputRoot
              placeholder="height"
              name="height"
              required
              className="w-24"
              value={height}
              onChange={handleHeightChange}
            />
            <Button variant="tertiary" className="ml-auto" onClick={handleSetDefaultResolution}>
              set defaults
            </Button>
          </div>
        </InputContainer>

        <Checkbox label="Enable resize" checked={resizeable} onChange={setResizeable} />
      </div>
    </Dialog>
  );
};
