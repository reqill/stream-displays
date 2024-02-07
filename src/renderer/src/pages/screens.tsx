import { FloatingElementProvider } from '@renderer/context/FloatingElementContext';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Screens: FC = () => {
  return (
    <FloatingElementProvider>
      <Outlet />
    </FloatingElementProvider>
  );
};

export default Screens;
