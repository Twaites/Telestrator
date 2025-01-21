import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { SketchField } from 'react-sketch2';
import type { RootState } from '../store';

export default function SketchCanvas() {
  const _sketch = useRef<any>();
  const { tool, lineColor, lineWidth } = useSelector((state: RootState) => state.sketch);
  
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
