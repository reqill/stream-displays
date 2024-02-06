import { FC, MouseEventHandler, ReactNode } from 'react';
import { motion, useMotionValue } from 'framer-motion';

type Coordinates = {
  x: number;
  y: number;
};

type MouseTrackerProps = {
  children?: ReactNode;
  onMove?: (coords: Coordinates) => void;
  onClick?: (coords: Coordinates) => void;
  onRelease?: (coords?: Coordinates) => void;
};

export const MouseTracker: FC<MouseTrackerProps> = ({ children, onClick, onMove, onRelease }) => {
  const x = useMotionValue(-1);
  const y = useMotionValue(-1);

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
    onMove?.({ x: e.clientX, y: e.clientY });
  };

  const onReleaseHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    onRelease?.({ x: e.clientX, y: e.clientY });
  };

  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="absolute inset-0 bg-blue-100"
      onMouseMove={onMouseMove}
      onContextMenu={onReleaseHandler}
      onClick={onClickHandler}
    >
      <motion.div initial={false} style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
};
