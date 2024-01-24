import { useEffect } from 'react';

const RANDOM_PATH_1_ID = 'fsdvrevexvs';
const RANDOM_PATH_2_ID = 'sdfhbgiosdf';

function App(): JSX.Element {
  useEffect(() => {
    const windowClosed = (pathId: string) => {
      console.log('Window closed:', pathId);
    };

    window.api.on('new-window-closed', windowClosed);

    return () => {
      window.api.removeListener('new-window-closed', windowClosed);
    };
  }, []);

  const handleOnClick = async (pathId: string) => {
    window.api.send('open-new-window', `screens/${pathId}`);
  };

  return (
    <div className="flex justify-center align-middle w-full h-screen flex-col gap-6 p-6">
      <button className="ring-8 rounded-sm mx-auto" onClick={() => handleOnClick(RANDOM_PATH_1_ID)}>
        Should open new window with {RANDOM_PATH_1_ID}
      </button>
      <button className="ring-8 rounded-sm mx-auto" onClick={() => handleOnClick(RANDOM_PATH_2_ID)}>
        Should open new window with {RANDOM_PATH_2_ID}
      </button>
    </div>
  );
}

export default App;
