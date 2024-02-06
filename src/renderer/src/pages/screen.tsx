import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@renderer/components/base/Button';
import { MouseTracker } from '@renderer/components/MouseTracker';

const Screen: FC = () => {
  const { screenId } = useParams<{ screenId: string }>();
  const [editMode, setEditMode] = useState(false);
  const [addTextMode, setAddTextMode] = useState(false);

  const toggleToolbar = useCallback(
    _.debounce(() => {
      setEditMode((prev) => !prev);
    }, 200),
    []
  );

  useEffect(() => {
    if (!screenId) return;

    window.api.on('edit-shortcut-pressed', toggleToolbar);

    return () => {
      window.api.removeListener('edit-shortcut-pressed', toggleToolbar);
    };
  }, [screenId]);

  return (
    <div className="bg-white flex flex-grow flex-col h-screen w-screen">
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              translateY: '-100%',
            }}
            transition={{ duration: 0.2, bounce: 0 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: '-100%' }}
            className="bg-gray-200 w-full"
          >
            Toolbar
            <Button variant="secondary" onClick={() => setAddTextMode(true)}>
              Add text
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {screenId}
      {/* {addTextMode && (
        <MouseTracker
          onClick={() => void setAddTextMode(false)}
          onRelease={() => void setAddTextMode(false)}
        >
          <div className="w-12 h-12 bg-red-500" />
        </MouseTracker>
      )} */}
      <ClickIndicatorComponent />
    </div>
  );
};

interface Indicator {
  id: number;
  x: number;
  y: number;
}

const ClickIndicatorComponent: React.FC = () => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [preview, setPreview] = useState<{ x: number; y: number } | null>(null);
  const [canAddPoints, setCanAddPoints] = useState<boolean>(true);
  let nextId = 0;

  const toggleAddingPoints = () => {
    setCanAddPoints(!canAddPoints);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (canAddPoints) {
      setPreview({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setPreview(null); // Hide preview when the mouse leaves the component
  };

  const addIndicator = (x: number, y: number) => {
    if (canAddPoints) {
      const newIndicator = { id: nextId++, x, y };
      setIndicators((prevIndicators) => [...prevIndicators, newIndicator]);
    }
  };

  const deleteIndicator = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent triggering addIndicator when deleting
    setIndicators((prevIndicators) => prevIndicators.filter((indicator) => indicator.id !== id));
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100vh', cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => preview && addIndicator(preview.x, preview.y)}
      onContextMenu={(e) => {
        e.preventDefault();
        setCanAddPoints(false);
      }}
    >
      <button onClick={toggleAddingPoints} style={{ position: 'absolute', zIndex: 1 }}>
        {canAddPoints ? 'Disable Adding Points' : 'Enable Adding Points'}
      </button>
      {preview && canAddPoints && (
        <div
          style={{
            position: 'absolute',
            top: preview.y,
            left: preview.x,
            width: '10px',
            height: '10px',
            backgroundColor: 'blue',
            transform: 'translate(-50%, -50%)',
            opacity: 0.5,
          }}
        />
      )}
      {indicators.map((indicator) => (
        <div
          key={indicator.id}
          onClick={(e) => deleteIndicator(indicator.id, e)}
          style={{
            position: 'absolute',
            top: indicator.y,
            left: indicator.x,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};

export default Screen;
