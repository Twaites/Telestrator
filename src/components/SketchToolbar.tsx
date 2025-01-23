import { Tools } from 'react-sketch2';
import { ButtonGroup, Button, Stack } from '@mui/joy';
import { Pencil, Slash, Square, Circle } from 'lucide-react';
import { useSketchStore } from '../state/SketchState';
import ColorPicker from './ColorPicker';

export default function SketchToolbar() {
  const { currentTool, setCurrentTool } = useSketchStore();

  const getButtonVariant = (tool: string) => {
    return tool === currentTool ? 'solid' : 'soft';
  };

  return (
    <Stack spacing={2} padding={2}>
      <ButtonGroup variant="soft" color="neutral" spacing={0.5}>
        <Button
          variant={getButtonVariant(Tools.Pencil)}
          onClick={() => setCurrentTool(Tools.Pencil)}
        >
          <Pencil size={24} />
        </Button>
        <Button
          variant={getButtonVariant(Tools.Line)}
          onClick={() => setCurrentTool(Tools.Line)}
        >
          <Slash size={24} />
        </Button>
        <Button
          variant={getButtonVariant(Tools.Rectangle)}
          onClick={() => setCurrentTool(Tools.Rectangle)}
        >
          <Square size={24} />
        </Button>
        <Button
          variant={getButtonVariant(Tools.Circle)}
          onClick={() => setCurrentTool(Tools.Circle)}
        >
          <Circle size={24} />
        </Button>
      </ButtonGroup>
      <ColorPicker />
    </Stack>
  );
}
