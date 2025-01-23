import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer.tsx'
import SketchCanvas from './components/SketchCanvas.tsx'
import SketchToolbar from './components/SketchToolbar.tsx'
import VideoControls from './components/VideoControls.tsx'
import { Box, Grid, Stack } from '@mui/joy'

function Telestrator() {
  return (
    <Grid container spacing={0} sx={{ flexGrow: 1, bgcolor: '#000' }}>
      <Grid xs="auto">
        <SketchToolbar />
      </Grid>
      <Grid xs>
        <Stack spacing={1} padding={1}>
          <Box paddingRight={2}>
          <VideoControls />
          </Box>
          <Box id="ReactPlayerAndSketchWrapper">
            <VideoPlayer />
            <SketchCanvas />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Telestrator