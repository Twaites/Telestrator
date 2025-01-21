import { useDispatch, useSelector } from 'react-redux';
import { Tools } from 'react-sketch2';
import { ButtonGroup, Button } from '@mui/joy';
import { Pencil, Slash, Square, Circle } from 'lucide-react';
import { setTool } from '../store/sketchSlice';
import type { RootState } from '../store';

export default function SketchToolbar() {
  const dispatch = useDispatch();
  const tool = useSelector((state: RootState) => state.sketch.tool);

  const getButtonVariant = (currentTool: string) => {
    return tool === currentTool ? 'solid' : 'soft';
  };

  return (
    <ButtonGroup variant="soft" color="neutral" spacing={0.5}>
      <Button
        variant={getButtonVariant(Tools.Pencil)}
        onClick={() => dispatch(setTool(Tools.Pencil))}
      >
        <Pencil size={24} />
      </Button>
      <Button
        variant={getButtonVariant(Tools.Line)}
        onClick={() => dispatch(setTool(Tools.Line))}
      >
        <Slash size={24} />
      </Button>
      <Button
        variant={getButtonVariant(Tools.Rectangle)}
        onClick={() => dispatch(setTool(Tools.Rectangle))}
      >
        <Square size={24} />
      </Button>
      <Button
        variant={getButtonVariant(Tools.Circle)}
        onClick={() => dispatch(setTool(Tools.Circle))}
      >
        <Circle size={24} />
      </Button>
    </ButtonGroup>
  );
}
