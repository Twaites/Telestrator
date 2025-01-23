import { Tools } from 'react-sketch2';
import { ButtonGroup, Button, Stack } from '@mui/joy';
import { Pencil, Slash, Square, Circle } from 'lucide-react';
import { useSketchStore } from '../state/SketchState';
import ColorPicker from './ColorPicker';
import { useEffect } from 'react';

export default function SketchToolbar() {
  const { currentTool, setCurrentTool } = useSketchStore();

  const getButtonVariant = (tool: string) => {
    return tool === currentTool ? 'solid' : 'soft';
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in input
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case 'p':
          e.preventDefault();
          setCurrentTool(Tools.Pencil);
          break;
        case 'r':
          e.preventDefault();
          setCurrentTool(Tools.Rectangle);
          break;
        case 'c':
          e.preventDefault();
          setCurrentTool(Tools.Circle);
          break;
        case 'l':
          e.preventDefault();
          setCurrentTool(Tools.Line);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setCurrentTool]);

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
