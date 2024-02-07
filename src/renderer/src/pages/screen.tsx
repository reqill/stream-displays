import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@renderer/components/base/Button';
import { useFloatingElementContext } from '@renderer/context/FloatingElementContext';

const Screen: FC = () => {
  const { screenId } = useParams<{ screenId: string }>();
  const [editMode, setEditMode] = useState(false);
  const { createElement } = useFloatingElementContext();

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
            <Button
              variant="secondary"
              onClick={(e) => createElement('textfield', { x: e.clientX, y: e.clientY })}
            >
              Add text
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {screenId}
    </div>
  );
};

export default Screen;
