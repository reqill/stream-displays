import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Screen: FC = () => {
  const { screenId } = useParams<{ screenId: string }>();

  return <div className="bg-white flex flex-grow flex-col h-screen w-screen">{screenId}</div>;
};

export default Screen;
