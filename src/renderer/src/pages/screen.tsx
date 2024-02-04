import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';

const Screen: FC = () => {
  const { screenId } = useParams<{ screenId: string }>();
  const [editMode, setEditMode] = useState(false);

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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 24 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-200 w-full"
          >
            Toolbar
          </motion.div>
        )}
      </AnimatePresence>
      {screenId}
    </div>
  );
};

export default Screen;
