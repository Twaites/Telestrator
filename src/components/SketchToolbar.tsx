import { Tools } from 'react-sketch2';
import { ButtonGroup, Button, Stack, Typography, Divider, Tooltip, Link, IconButton } from '@mui/joy';
import { Pencil, Slash, Square, Circle, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useSketchStore } from '../state/SketchState';
import ColorPicker from './ColorPicker';
import { useEffect, useState } from 'react';

export default function SketchToolbar() {
  const { currentTool, setCurrentTool } = useSketchStore();
  const [isKeybindsOpen, setIsKeybindsOpen] = useState(false);

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

  return (
    <Stack 
      spacing={2} 
      sx={{ 
        width: '100%',
        height: '100%',
        p: 2,
        boxSizing: 'border-box',
        display: 'flex'
      }}
    >
      {/* Fixed Tools Section */}
      <Stack spacing={2} sx={{ flexShrink: 0 }}>
        {/* Title Section */}
        <Stack 
          spacing={0} 
          sx={{ 
            mb: 1
          }}
        >
          <Typography
            level="h1"
            sx={{
              fontSize: '2.5rem',
              fontWeight: 400,
              letterSpacing: '0.02em',
              mb: -1,
              textAlign: 'center'
            }}
          >
            Telestrator
          </Typography>
          <Typography
            level="title-lg"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textAlign: 'right',
              pr: 4  // Add some padding from the right edge
            }}
          >
            by Twaites
          </Typography>
        </Stack>

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
            sx={{ 
              borderTop: '1px solid', 
              borderColor: 'divider',
              borderRadius: 0,
            }}
          >
            Clear
          </Button>
        </Stack>

        {/* Collapsible Key Bindings Section */}
        <Stack 
          spacing={1}
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {/* Keybinds Header */}
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setIsKeybindsOpen(!isKeybindsOpen)}
            endDecorator={isKeybindsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            sx={{
              justifyContent: 'space-between',
              p: 1.5,
              borderRadius: 0,
              '&:hover': {
                bgcolor: 'background.level1'
              }
            }}
          >
            <Typography level="title-sm">Keyboard Shortcuts</Typography>
          </Button>

          {/* Collapsible Content */}
          <Stack
            spacing={1}
            sx={{
              height: isKeybindsOpen ? 'auto' : 0,
              overflow: 'hidden',
              transition: 'height 0.2s ease',
              px: 2,
              pb: isKeybindsOpen ? 2 : 0,
            }}
          >
            <Typography level="title-sm">Sketch Controls</Typography>
            <Stack spacing={0.5}>
              <Typography level="body-sm"><strong>1</strong> - pencil</Typography>
              <Typography level="body-sm"><strong>2</strong> - line</Typography>
              <Typography level="body-sm"><strong>3</strong> - square</Typography>
              <Typography level="body-sm"><strong>4</strong> - circle</Typography>
              <Typography level="body-sm"><strong>ctrl/cmd + z</strong> - undo</Typography>
              <Typography level="body-sm"><strong>ctrl/cmd + shift + z</strong> - redo</Typography>
              <Typography level="body-sm"><strong>shift + delete</strong> - clear</Typography>
            </Stack>

            <Divider />

            <Typography level="title-sm">Video Controls</Typography>
            <Stack spacing={0.5}>
              <Typography level="body-sm"><strong>j</strong> - speed down 25%</Typography>
              <Typography level="body-sm"><strong>k</strong> - play/pause</Typography>
              <Typography level="body-sm"><strong>l</strong> - speed up 25%</Typography>
              <Typography level="body-sm"><strong>left arrow</strong> - volume down</Typography>
              <Typography level="body-sm"><strong>right arrow</strong> - volume up</Typography>
              <Typography level="body-sm"><strong>m</strong> - mute</Typography>
            </Stack>
          </Stack>

          {/* Source Code Link - Always Visible */}
          <Divider sx={{ m: 0 }} />
          <Link
            href="https://github.com/Twaites/Telestrator"
            target="_blank"
            rel="noopener noreferrer"
            level="body-sm"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'neutral.500',
              textDecoration: 'none',
              p: 1.5,
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            <Github size={16} />
            View Source Code
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
