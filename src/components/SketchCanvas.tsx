import { useRef } from 'react';
import { SketchField } from 'react-sketch2';
import { useSketchStore } from '../state/SketchState';

export default function SketchCanvas() {
  const { currentTool, lineColor, lineWidth } = useSketchStore();
  const sketchRef = useRef<typeof SketchField>(null);
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
  )
}
