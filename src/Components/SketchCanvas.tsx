import { useRef } from 'react';
import { SketchField } from 'react-sketch2';
import { useSketchStore } from '../store/sketchStore';

export default function SketchCanvas() {
  const _sketch = useRef<any>();
  const { tool, lineColor, lineWidth } = useSketchStore();
  
  return (
    <SketchField
      className='sketch-canvas'
      width='100%'
      height='100%'
      ref={_sketch}
      undoSteps={500}
      tool={tool}
      lineColor={lineColor}
      lineWidth={lineWidth}
    />
  )
}
