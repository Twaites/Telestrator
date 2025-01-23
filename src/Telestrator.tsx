import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer.tsx'
import SketchCanvas from './components/SketchCanvas.tsx'
import SketchToolbar from './components/SketchToolbar.tsx'
import VideoControls from './components/VideoControls.tsx'
import { Grid, Stack } from '@mui/joy'

function Telestrator() {
  return (
    <Grid container spacing={0} sx={{ flexGrow: 1, bgcolor: '#000' }}>
      <Grid xs="auto">
        <SketchToolbar />
      </Grid>
      <Grid xs>
        <Stack spacing={1} padding={1}>
          <VideoControls />
          <div id="ReactPlayerAndSketchWrapper">
            <VideoPlayer />
            <SketchCanvas />
          </div>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Telestrator