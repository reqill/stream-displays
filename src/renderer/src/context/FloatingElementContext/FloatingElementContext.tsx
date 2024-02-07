import { PlaceableTextField } from '@renderer/components/PlaceableTextField';
import clsx from 'clsx';
import {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
  createContext,
  useContext,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

type ElementContextType = {
  createElement: (elementType: ElementType, initial?: Partial<ElementData>) => void;
};

type ElementType = 'textfield' | 'image' | 'shape';

type ElementData = {
  id: string;
  x: number;
  y: number;
  type: ElementType;
};

type Coords = {
  x: number;
  y: number;
};

const ElementContext = createContext<ElementContextType | undefined>(undefined);

type FloatingElementProviderProps = {
  children: ReactNode;
};

export const useFloatingElementContext = () => {
  const context = useContext(ElementContext);
  if (context === undefined) {
    throw new Error('useElement must be used within a FloatingElementProvider');
  }
  return context;
};

const FloatingElementProvider: FC<FloatingElementProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [elementToBeCreated, setElementToBeCreated] = useState<ElementType | null>(null);
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const [draggedElementOffset, setDraggedElementOffset] = useState<Coords | null>(null);
  const [previewElement, setPreviewElement] = useState<ElementData | null>(null);
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
  const [mouseToElementOffset, setMouseToElementOffset] = useState<Coords | null>(null);

  const createElement = (elementType: ElementType, initial?: Partial<ElementData>) => {
    setElementToBeCreated(elementType);
    if (initial?.x && initial?.y) {
      setPreviewElement({ id: 'preview', type: elementType, x: initial.x, y: initial.y });
    }
  };

  const deleteElement = (id: Element['id']) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleMouseClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (elementToBeCreated) {
      const newElement: ElementData = {
        id: uuidv4(),
        x: event.clientX,
        y: event.clientY,
        type: elementToBeCreated,
      };
      setElements([...elements, newElement]);
      setElementToBeCreated(null);
      setPreviewElement(null);
    }
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    const elementId = event.currentTarget.getAttribute('data-element-id');
    if (elementId) {
      // Find the element being dragged
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      // Calculate the distance between the mouse position and the element's upper-left corner
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      setDraggedElementId(elementId);

      // Store the offset from the mouse to the element's corner
      setDraggedElementOffset({
        x: event.clientX - offsetX,
        y: event.clientY - offsetY,
      });

      // Store the offset from the mouse to the element's corner
      setMouseToElementOffset({
        x: offsetX,
        y: offsetY,
      });
    }
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (draggedElementId && draggedElementOffset && mouseToElementOffset) {
      // Calculate deltas based on current event coordinates and initial drag offset
      const deltaX = event.clientX - draggedElementOffset.x;
      const deltaY = event.clientY - draggedElementOffset.y;

      // Default new positions to be the updated ones based on the deltas
      const newX = draggedElementOffset.x + deltaX;
      const newY = draggedElementOffset.y + deltaY;

      // Update the elements with the new or locked coordinates
      const updatedElements = elements.map((element) => {
        if (element.id === draggedElementId) {
          return {
            ...element,
            x: newX,
            y: newY,
          };
        }
        return element;
      });

      setElements(updatedElements);

      // Update draggedElementOffset only if Shift is not pressed for normal drag behavior
      // This ensures during Shift-press drag, the offset doesn't get updated, preventing jumps
      if (!isShiftKeyPressed) {
        setDraggedElementOffset({
          x: newX - mouseToElementOffset.x,
          y: newY - mouseToElementOffset.y,
        });
      }
    }

    // Other logic for handling preview element remains unchanged
    if (elementToBeCreated) {
      setPreviewElement({
        id: 'preview',
        x: event.clientX,
        y: event.clientY,
        type: elementToBeCreated,
      });
    } else {
      setPreviewElement(null);
    }
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    setDraggedElementId(null);
    setDraggedElementOffset(null);
  };

  const handleResize = (e: SyntheticEvent<HTMLDivElement, Event>, id: Element['id']) => {
    const target = e.target as HTMLDivElement;
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          width: target.offsetWidth,
          height: target.offsetHeight,
        };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Shift') {
      setIsShiftKeyPressed(true);
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Shift') {
      setIsShiftKeyPressed(false);
    }
  };

  const getElementComponent = (element: ElementData) => {
    switch (element.type) {
      case 'textfield':
        return <PlaceableTextField />;
      case 'image':
        return <span>Image</span>;
      case 'shape':
        return <span>Shape</span>;
    }
  };

  return (
    <ElementContext.Provider value={{ createElement }}>
      <div
        onClick={handleMouseClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={0}
      >
        {children}
        {elements.map((element) => (
          <div
            key={element.id}
            onResize={(e) => handleResize(e, element.id)}
            style={{
              position: 'absolute',
              left: element.x,
              top: element.y,
              userSelect: 'none',
              resize: 'both',
              overflow: 'hidden',
              minWidth: '22px',
              minHeight: '12px',
            }}
          >
            <div className="relative border-2 border-dashed border-zinc-400 rounded-sm h-full w-full group">
              {getElementComponent(element)}
              <div
                data-element-id={element.id}
                onMouseDown={handleMouseDown}
                className={clsx(
                  'absolute left-0 top-0 w-4 h-4 group-hover:bg-zinc-400 group-hover:cursor-move elementer-events-none group-hover:elementer-events-auto',
                  previewElement && 'hidden',
                  draggedElementId === element.id
                    ? 'bg-zinc-400'
                    : draggedElementId === null
                      ? ''
                      : 'hidden'
                )}
              />
              <div
                onClick={() => deleteElement(element.id)}
                className={clsx(
                  'absolute right-0 top-0 w-4 h-4 group-hover:bg-red-500 group-hover:cursor-elementer elementer-events-none group-hover:elementer-events-auto',
                  previewElement && 'hidden',
                  draggedElementId === element.id
                    ? 'bg-red-500'
                    : draggedElementId === null
                      ? ''
                      : 'hidden'
                )}
              />
            </div>
          </div>
        ))}
        {previewElement && (
          <div
            style={{
              position: 'absolute',
              left: previewElement.x,
              top: previewElement.y,
            }}
          >
            <div className="border-2 border-dashed border-zinc-400 rounded-sm w-full h-full">
              {getElementComponent(previewElement)}
            </div>
          </div>
        )}
      </div>
    </ElementContext.Provider>
  );
};

export { FloatingElementProvider };
