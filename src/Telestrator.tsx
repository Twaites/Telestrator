import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer'
import SketchCanvas from './components/SketchCanvas'
import SketchToolbar from './components/SketchToolbar'
import VideoControls from './components/VideoControls'
import { Grid, Stack, Box } from '@mui/joy'

function Telestrator() {
  return (
    <Grid 
      container 
      spacing={0} 
      sx={{ 
        flexGrow: 1, 
        bgcolor: '#000',
        height: '100vh'
      }}
    >
      <Grid xs="auto">
        <SketchToolbar />
      </Grid>

      <Grid xs>
        <Stack 
          spacing={1} 
          padding={1}
          sx={{ height: '100%' }}
        >
          <Box paddingRight={2}>
            <VideoControls />
          </Box>

          <Box 
            id="ReactPlayerAndSketchWrapper"
            sx={{ 
              flex: 1,
              position: 'relative',
              height: '100%',
              '& > *': {
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