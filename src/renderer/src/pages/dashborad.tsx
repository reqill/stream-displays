import { CreateViewForm } from '@renderer/components/CreateViewForm';
import { TemplateList } from '@renderer/components/Templates/TemplateList';
import { useAppDispatch } from '@renderer/store';
import { getAllTemplates, getAllTemplatesInArraySelector } from '@renderer/store/templates';
import { closeWindow, getOpenenedWindowsSelector, openWindow } from '@renderer/store/windows';
import { TemplateViewType } from '@renderer/types/templateView.types';
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

  const handleOnAddNewClick = () => {
    setAddTemplateFormIsOpen(true);
  };

  const handleCloseAddTemplateForm = () => {
    setAddTemplateFormIsOpen(false);
  };

  const handleOnTemplateClick = (template: TemplateViewType) => {
    const path = `screens/${template.id}`;

    dispatch(openWindow(path));
    // TODO: should propably be handled by redux and have some different interface
    window.api.send(
      'open-new-window',
      path,
      template.resolution,
      template.name,
      template.resizeable
    );
  };

  return (
    <div className="flex justify-center align-middle w-full h-screen flex-col gap-6 p-6">
      <h1 className="mx-auto font-medium text-3xl text-zinc-200">Your view templates</h1>
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
