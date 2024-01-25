import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Screen: FC = () => {
  const { screenId } = useParams<{ screenId: string }>();

  return (
    <div>
      <h2>Screen</h2>
      <p>Currently displaying content for screen ID: {screenId}</p>
    </div>
  );
};

export default Screen;
