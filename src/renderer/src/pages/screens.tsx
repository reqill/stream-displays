import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Screens: FC = () => {
  return (
    <div>
      <h1>Screens</h1>
      <Outlet /> {/* This will render the matched child route */}
    </div>
  );
};

export default Screens;
