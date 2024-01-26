import { CreateViewForm } from '@renderer/components/CreateViewForm';
import { TemplateList } from '@renderer/components/Templates/TemplateList';
import { useAppDispatch } from '@renderer/store';
import { getAllTemplates, getAllTemplatesInArraySelector } from '@renderer/store/templates';
import { closeWindow, getOpenenedWindowsSelector, openWindow } from '@renderer/store/windows';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();

  const [addTemplateFormIsOpen, setAddTemplateFormIsOpen] = useState(false);

  const openedWindowsUrls = useSelector(getOpenenedWindowsSelector);
  const templates = useSelector(getAllTemplatesInArraySelector);
  const openedTemplateViews = Object.keys(openedWindowsUrls).map((url) =>
    url.replace(/^screens\//, '')
  );

  useEffect(() => {
    dispatch(getAllTemplates());

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
    console.log('Opened windows:', openedWindowsUrls);
    console.log('Opened template views:', openedTemplateViews);
  }, [openedWindowsUrls, openedTemplateViews]);

  const handleOnAddNewClick = () => {
    setAddTemplateFormIsOpen(true);
  };

  const handleCloseAddTemplateForm = () => {
    setAddTemplateFormIsOpen(false);
  };

  const handleOnTemplateClick = (templateId: string) => {
    const path = `screens/${templateId}`;

    dispatch(openWindow(path));
    window.api.send('open-new-window', path);
  };

  return (
    <div className="flex justify-center align-middle w-full h-screen flex-col gap-6 p-6">
      <h1 className="mx-auto font-medium text-3xl text-zinc-200">Your view templates</h1>
      {/* <button className="ring-8 rounded-sm mx-auto" onClick={() => handleOnClick(RANDOM_PATH_1_ID)}>
        Should open new window with {RANDOM_PATH_1_ID}
        {openedWindows[`screens/${RANDOM_PATH_1_ID}`] ? ' (already opened)' : ''}
      </button>
      <button className="ring-8 rounded-sm mx-auto" onClick={() => handleOnClick(RANDOM_PATH_2_ID)}>
        Should open new window with {RANDOM_PATH_2_ID}
        {openedWindows[`screens/${RANDOM_PATH_2_ID}`] ? ' (already opened)' : ''}
      </button> */}
      <div className="flex w-ful align-middle justify-center mt-8">
        <TemplateList
          activeWindowIds={openedTemplateViews}
          onAddNewClick={handleOnAddNewClick}
          onTemplateClick={handleOnTemplateClick}
          templates={templates}
        />
      </div>
      <CreateViewForm open={addTemplateFormIsOpen} onClose={handleCloseAddTemplateForm} />
    </div>
  );
};

export default Dashboard;
