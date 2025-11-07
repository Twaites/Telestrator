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

  // Update lineWidth when it changes - react-sketch2 may not react to prop changes
  useEffect(() => {
    if (sketchRef.current) {
      const sketchField = sketchRef.current as any;
      // Access the internal fabric canvas and update lineWidth for all brushes
      if (sketchField._fc) {
        const canvas = sketchField._fc;
        // Update free drawing brush width
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.width = lineWidth;
        }
        // Update the lineWidth property on the component state
        if (sketchField.state) {
          sketchField.state.lineWidth = lineWidth;
        }
        // Force update if there's an update method
        if (sketchField.forceUpdate) {
          sketchField.forceUpdate();
        }
      }
    }
  }, [lineWidth]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in the address bar
      const target = event.target as HTMLElement;
      const addressBar = document.querySelector('[data-address-bar-container]');
      if (target instanceof HTMLInputElement && addressBar && addressBar.contains(target)) {
        return;
      }

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
