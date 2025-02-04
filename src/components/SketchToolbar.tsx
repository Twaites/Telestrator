import { Tools } from 'react-sketch2';
import { ButtonGroup, Button, Stack } from '@mui/joy';
import { Pencil, Slash, Square, Circle } from 'lucide-react';
import { useSketchStore } from '../state/SketchState';
import ColorPicker from './ColorPicker';
import { useEffect } from 'react';

export default function SketchToolbar() {
  const { currentTool, setCurrentTool, sketchRef } = useSketchStore();

  const getButtonVariant = (tool: string) => {
    return tool === currentTool ? 'solid' : 'soft';
  };

  useEffect(() => {

    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in input
      if (event.target instanceof HTMLInputElement) return;

      // Ignore if any modifier keys are pressed
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return;
      }

      switch (event.key) {
        case '1':
          event.preventDefault();
          setCurrentTool(Tools.Pencil);
          break;
        case '2':
          event.preventDefault();
          setCurrentTool(Tools.Line);
          break;
        case '3':
          event.preventDefault();
          setCurrentTool(Tools.Rectangle);
          break;
        case '4':
          event.preventDefault();
          setCurrentTool(Tools.Circle);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setCurrentTool]);

  const handleUndo = () => {
    if (sketchRef?.current?.canUndo()) {
      sketchRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (sketchRef?.current?.canRedo()) {
      sketchRef.current.redo();
    }
  };

  const handleClear = () => {
    if (sketchRef?.current) {
      sketchRef.current.clear();
    }
  };

  return (
    <Stack 
      spacing={2} 
      sx={{ 
        width: '100%',
        height: '100%',
        p: 2,
        boxSizing: 'border-box'
      }}
    >
      {/* Color Picker Section */}
      <Stack 
        sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
        }}
      >
        <ColorPicker />

      {/* Tools Section */}
      <ButtonGroup 
        variant="plain" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          '& .MuiButton-root': {
            flex: 1,
            borderRadius: 0,
          }
        }}
      >
        <Button
          variant={getButtonVariant(Tools.Pencil)}
          onClick={() => setCurrentTool(Tools.Pencil)}
          color="primary"
        >
          <Stack spacing={1} alignItems="center">
            <Pencil size={20} />
          </Stack>
        </Button>
        <Button
          variant={getButtonVariant(Tools.Line)}
          onClick={() => setCurrentTool(Tools.Line)}
          color="primary"
        >
          <Stack spacing={1} alignItems="center">
            <Slash size={20} />
          </Stack>
        </Button>
        <Button
          variant={getButtonVariant(Tools.Rectangle)}
          onClick={() => setCurrentTool(Tools.Rectangle)}
          color="primary"
        >
          <Stack spacing={1} alignItems="center">
            <Square size={20} />
          </Stack>
        </Button>
        <Button
          variant={getButtonVariant(Tools.Circle)}
          onClick={() => setCurrentTool(Tools.Circle)}
          color="primary"
        >
          <Stack spacing={1} alignItems="center">
            <Circle size={20} />
          </Stack>
        </Button>
      </ButtonGroup>
      </Stack>
      {/* Undo/Redo/Clear Section */}
      <Stack 
        sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Stack direction="row">
          <Button 
            variant="plain" 
            color="primary"
            onClick={handleUndo}
            sx={{ 
              flex: 1, 
              borderRight: '1px solid', 
              borderColor: 'divider',
              borderRadius: 0,
            }}
          >
            Undo
          </Button>
          <Button 
            variant="plain" 
            color="primary"
            onClick={handleRedo}
            sx={{ 
              flex: 1, 
              borderRadius: 0,
            }}
          >
            Redo
          </Button>
        </Stack>
        <Button 
          variant="plain" 
          color="primary"
          onClick={handleClear}
          sx={{ 
            borderTop: '1px solid', 
            borderColor: 'divider',
            borderRadius: 0,
          }}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}
