import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer.tsx'
import SketchCanvas from './components/SketchCanvas.tsx'
import SketchToolbar from './components/SketchToolbar.tsx'
import VideoControls from './components/VideoControls.tsx'

function Telestrator() {
  return (
    <div id="ReactPlayerAndSketchWrapper">
      <VideoPlayer />
      <SketchCanvas />
      <SketchToolbar />
      <VideoControls />
    </div>
  )
}

export default Telestrator