import { Tools } from 'react-sketch2';
import { ButtonGroup, Button } from '@mui/joy';
import { Pencil, Slash, Square, Circle } from 'lucide-react';
import { useSketchStore } from '../state/SketchState';

export default function SketchToolbar() {
  const { tool, setTool } = useSketchStore();

  const getButtonVariant = (currentTool: string) => {
    return tool === currentTool ? 'solid' : 'soft';
  };

  return (
    <ButtonGroup variant="soft" color="neutral" spacing={0.5}>
      <Button
        variant={getButtonVariant(Tools.Pencil)}
        onClick={() => setTool(Tools.Pencil)}
      >
        <Pencil size={24} />
      </Button>
      <Button
        variant={getButtonVariant(Tools.Line)}
        onClick={() => setTool(Tools.Line)}
      >
        <Slash size={24} />
      </Button>
      <Button
        variant={getButtonVariant(Tools.Rectangle)}
        onClick={() => setTool(Tools.Rectangle)}
      >
        <Square size={24} />
      </Button>
      <Button
        variant={getButtonVariant(Tools.Circle)}
        onClick={() => setTool(Tools.Circle)}
      >
        <Circle size={24} />
      </Button>
    </ButtonGroup>
  );
}
