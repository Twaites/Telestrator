import { Tools } from 'react-sketch2';
import { ButtonGroup, Button, Stack, Typography, Divider, Tooltip, Link, Box, Slider } from '@mui/joy';
import { Pencil, Slash, Square, Circle, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useSketchStore } from '../state/SketchState';
import ColorPicker from './ColorPicker';
import { useEffect, useState } from 'react';

export default function SketchToolbar() {
  const { currentTool, setCurrentTool, sketchRef, lineWidth, setLineWidth } = useSketchStore();
  const [isKeybindsOpen, setIsKeybindsOpen] = useState(false);

  const getButtonVariant = (tool: string) => {
    return tool === currentTool ? 'solid' : 'soft';
  };

  useEffect(() => {

    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in the address bar
      const target = event.target as HTMLElement;
      const addressBar = document.querySelector('[data-address-bar-container]');
      if (target instanceof HTMLInputElement && addressBar && addressBar.contains(target)) {
        return;
      }

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
      spacing={0}
      sx={{
        width: '250px',
        height: '100vh',
        p: 1.5,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Tools Section - Will stay at top */}
      <Stack spacing={2} sx={{ flexShrink: 0 }}>
        {/* Title Section */}
        <Stack
          spacing={0}
          sx={{
            mb: 0.5
          }}
        >
          <Typography
            level="h1"
            sx={{
              fontSize: '2rem',
              fontWeight: 400,
              letterSpacing: '0.02em',
              mb: -1.25,
              mt: 0,
              textAlign: 'center'
            }}
          >
            Telestrator
          </Typography>
          <Typography
            level="title-lg"
            sx={{
              fontSize: '1rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textAlign: 'right',
              pr: 5
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
            p: 1.5,
            pb: 0,
          }}
          alignItems="center"
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
            <Tooltip title="Pencil (1)" placement="top">
              <Button
                variant={getButtonVariant(Tools.Pencil)}
                onClick={() => setCurrentTool(Tools.Pencil)}
                color="primary"
              >
                <Stack spacing={1} alignItems="center">
                  <Pencil size={20} />
                </Stack>
              </Button>
            </Tooltip>
            <Tooltip title="Line (2)" placement="top">
              <Button
                variant={getButtonVariant(Tools.Line)}
                onClick={() => setCurrentTool(Tools.Line)}
                color="primary"
              >
                <Stack spacing={1} alignItems="center">
                  <Slash size={20} />
                </Stack>
              </Button>
            </Tooltip>
            <Tooltip title="Rectangle (3)" placement="top">
              <Button
                variant={getButtonVariant(Tools.Rectangle)}
                onClick={() => setCurrentTool(Tools.Rectangle)}
                color="primary"
              >
                <Stack spacing={1} alignItems="center">
                  <Square size={20} />
                </Stack>
              </Button>
            </Tooltip>
            <Tooltip title="Circle (4)" placement="top">
              <Button
                variant={getButtonVariant(Tools.Circle)}
                onClick={() => setCurrentTool(Tools.Circle)}
                color="primary"
              >
                <Stack spacing={1} alignItems="center">
                  <Circle size={20} />
                </Stack>
              </Button>
            </Tooltip>
          </ButtonGroup>

          {/* Tool Size Section */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            width="100%"
            sx={{
              pt: 1,
            }}
          >
            <Typography level="body-xs" sx={{ fontSize: '0.9rem', minWidth: '35px' }}>
              Tool Size
            </Typography>
            <Slider
              value={lineWidth}
              onChange={(_, value) => setLineWidth(value as number)}
              min={1}
              max={10}
              step={1}
              valueLabelDisplay="auto"
              color="primary"
              variant="solid"
              size="sm"
              sx={{
                flex: 1,
                zIndex: 1,
                pt: 5,
                pb: 0,
                left: 2,
                width: 'calc(100% - 5px)',
              }}
            />
          </Stack>
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
            <Tooltip title="Undo (Ctrl/Cmd + Z)" placement="top">
              <Button
                variant="plain"
                color="primary"
                onClick={() => sketchRef?.current?.undo()}
                sx={{
                  flex: 1,
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 0,
                }}
              >
                Undo
              </Button>
            </Tooltip>
            <Tooltip title="Redo (Ctrl/Cmd + Shift + Z)" placement="top">
              <Button
                variant="plain"
                color="primary"
                onClick={() => sketchRef?.current?.redo()}
                sx={{
                  flex: 1,
                  borderRadius: 0,
                }}
              >
                Redo
              </Button>
            </Tooltip>
          </Stack>
          <Tooltip title="Clear (Shift + Delete)" placement="bottom">
            <Button
              variant="plain"
              color="primary"
              onClick={() => sketchRef?.current?.clear()}
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
              }}
            >
              Clear
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Spacer to push keybinds to bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Keybinds Section - At bottom, scrollable */}
      <Stack
        spacing={1}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          mt: 2,
        }}
      >
        {/* Keybinds Header - Stays fixed */}
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
              bgcolor: 'background.level1',
            },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography level="title-sm">Keyboard Shortcuts</Typography>
        </Button>

        {/* Scrollable Content */}
        <Stack
          spacing={1}
          sx={{
            display: isKeybindsOpen ? 'flex' : 'none',
            overflow: 'auto',
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

        {/* Source Code Link - Always at bottom */}
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
            pl: 1.5,
            pb: 1.5,
            ...(isKeybindsOpen && {
              borderTop: '1px solid',
              borderColor: 'divider',
              pt: 1.5,
            }),
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
  );
}
