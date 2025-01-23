import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer'
import SketchCanvas from './components/SketchCanvas'
import SketchToolbar from './components/SketchToolbar'
import VideoControls from './components/VideoControls'
import { Box, Grid, Stack } from '@mui/joy'
import { useState, useEffect } from 'react'

function Telestrator() {
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in input
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case 'h':
          e.preventDefault();
          setControlsVisible(prev => !prev); // Toggle visibility
          break;
        case 'escape':
          e.preventDefault();
          setControlsVisible(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Grid 
      container 
      spacing={0} 
      sx={{ 
        flexGrow: 1, 
        bgcolor: '#000',
        height: '100vh' // Ensure full height
      }}
    >
      {/* Sketch toolbar */}
      <Grid 
        xs="auto" 
        sx={{ 
          display: controlsVisible ? 'block' : 'none'
        }}
      >
        <SketchToolbar />
      </Grid>

      {/* Main content */}
      <Grid xs>
        <Stack 
          spacing={controlsVisible ? 1 : 0} 
          padding={controlsVisible ? 1 : 0}
          sx={{ height: '100%' }}
        >
          {/* Video controls */}
          {controlsVisible && (
            <Box paddingRight={2}>
              <VideoControls />
            </Box>
          )}

          {/* Player and canvas wrapper */}
          <Box 
            id="ReactPlayerAndSketchWrapper"
            sx={{ 
              flex: 1,
              position: 'relative',
              '& > *': { // Target both player and canvas
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100% !important',
                height: '100% !important'
              }
            }}
          >
            <VideoPlayer />
            <SketchCanvas />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Telestrator