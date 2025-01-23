import { useRef, useEffect } from 'react';
import { SketchField } from 'react-sketch2';
import { useSketchStore } from '../state/SketchState';

export default function SketchCanvas() {
  const { currentTool, lineColor, lineWidth } = useSketchStore();
  const sketchRef = useRef<typeof SketchField>(null);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.shiftKey && (event.key === 'Delete' || event.key === 'Backspace')) {
        sketchRef.current?.clear();
      }
      switch (event.code) {
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            sketchRef.current?.undo();
          }
          break;
          case 'ArrowRight':
            if (event.ctrlKey || event.metaKey) {
              sketchRef.current?.redo();
            }
            break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <SketchField
      className='sketch-canvas'
      width='100%'
      height='100%'
      undoSteps={500}
      tool={currentTool}
      lineColor={lineColor}
      lineWidth={lineWidth}
      ref={sketchRef}
    />
  );
}
