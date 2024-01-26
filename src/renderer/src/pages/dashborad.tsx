import { TemplateList } from '@renderer/components/Templates/TemplateList';
import { useAppDispatch } from '@renderer/store';
import { closeWindow, getOpenenedWindowsSelector, openWindow } from '@renderer/store/windows';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

const RANDOM_PATH_1_ID = 'fsdvrevexvs';
const RANDOM_PATH_2_ID = 'sdfhbgiosdf';

const Dashboard: FC = () => {
  const openedWindows = useSelector(getOpenenedWindowsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const windowClosed = (pathId: string) => {
      dispatch(closeWindow(pathId));
      console.log('Window closed:', pathId);
    };

    window.api.on('new-window-closed', windowClosed);

    return () => {
      window.api.removeListener('new-window-closed', windowClosed);
    };
  }, []);

  useEffect(() => {
    console.log('Opened windows:', openedWindows);
  }, [openedWindows]);

  const handleOnClick = async (pathId: string) => {
    const path = `screens/${pathId}`;

    dispatch(openWindow(path));
    window.api.send('open-new-window', path);
  };

  return (
    <div className="flex justify-center align-middle w-full h-screen flex-col gap-6 p-6">
      <button className="ring-8 rounded-sm mx-auto" onClick={() => handleOnClick(RANDOM_PATH_1_ID)}>
        Should open new window with {RANDOM_PATH_1_ID}
        {openedWindows[`screens/${RANDOM_PATH_1_ID}`] ? ' (already opened)' : ''}
      </button>
      <button className="ring-8 rounded-sm mx-auto" onClick={() => handleOnClick(RANDOM_PATH_2_ID)}>
        Should open new window with {RANDOM_PATH_2_ID}
        {openedWindows[`screens/${RANDOM_PATH_2_ID}`] ? ' (already opened)' : ''}
      </button>
      <TemplateList />
    </div>
  );
};

export default Dashboard;
