import { useRef, useEffect } from 'react';
import { SketchField } from 'react-sketch2';
import { useSketchStore } from '../state/SketchState';

export default function SketchCanvas() {
  const { currentTool, lineColor, lineWidth, setSketchRef } = useSketchStore();
  const sketchRef = useRef<typeof SketchField>(null);

  useEffect(() => {
    setSketchRef(sketchRef);
    return () => setSketchRef(null);
  }, [setSketchRef]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in input
      if (event.target instanceof HTMLInputElement) return;

      // Support both Ctrl (Windows) and Cmd (Mac)
      const isModifierKey = event.ctrlKey || event.metaKey;

      if (event.shiftKey && (event.key === 'Delete' || event.key === 'Backspace')) {
        sketchRef.current?.clear();
        return;
      }

      if (isModifierKey && event.key === 'z') {
        if (event.shiftKey) {
          sketchRef.current?.redo();
        } else {
          sketchRef.current?.undo();
        }
        return;
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
      width="100%"
      height="100%"
      undoSteps={500}
      tool={currentTool}
      lineColor={lineColor}
      lineWidth={lineWidth}
      ref={sketchRef}
    />
  );
}
