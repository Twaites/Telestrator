import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer'
import SketchCanvas from './components/SketchCanvas'
import SketchToolbar from './components/SketchToolbar'
import VideoControls from './components/VideoControls'
import { Box, Grid, Stack, Snackbar } from '@mui/joy'
import { useState, useEffect } from 'react'

function Telestrator() {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in input
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case 'f':
          e.preventDefault();
          setControlsVisible(prev => !prev); // Toggle visibility
          if (controlsVisible) {
            setShowSnackbar(true);
          }
          break;
        case 'escape':
          e.preventDefault();
          setControlsVisible(true);
          setShowSnackbar(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [controlsVisible]);

  return (
    <>
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

      <Snackbar
        variant="soft"
        color="neutral"
        size="md"
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={5000}
        sx={{ 
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          justifyContent: 'center'
        }}
      >
        Press ESC or F to exit fullscreen mode
      </Snackbar>
    </>
  )
}

export default Telestrator