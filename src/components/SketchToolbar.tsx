import { Tools } from 'react-sketch2';
import { ButtonGroup, Button, Stack, Typography, Divider, Tooltip, Link, Box, Slider } from '@mui/joy';
import { Pencil, Slash, Square, Circle, ChevronDown, ChevronUp } from 'lucide-react';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
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

    const sizeKeyMap: Record<string, number> = {
      Digit1: 1,
      Digit2: 2,
      Digit3: 3,
      Digit4: 4,
      Digit5: 5,
      Digit6: 6,
      Digit7: 7,
      Digit8: 8,
      Digit9: 9,
      Digit0: 10,
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in the address bar
      const target = event.target as HTMLElement;
      const addressBar = document.querySelector('[data-address-bar-container]');
      if (target instanceof HTMLInputElement && addressBar && addressBar.contains(target)) {
        return;
      }

      const hasDisallowedModifier = event.ctrlKey || event.metaKey || event.altKey;
      if (hasDisallowedModifier) {
        return;
      }

      if (event.shiftKey) {
        const size = sizeKeyMap[event.code];
        if (size) {
          event.preventDefault();
          setLineWidth(size);
        }
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
  }, [setCurrentTool, setLineWidth]);

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
                left: 5,
                maxWidth: '125px',
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
            <Typography level="body-sm"><strong>shift + #</strong> - adjust tool size</Typography>
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
          <GithubIcon />
          View Source Code
        </Link>
      </Stack>
    </Stack>
  );
}
