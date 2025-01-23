import './Telestrator.css'
import VideoPlayer from './components2/VideoPlayer.tsx'
import SketchCanvas from './components2/SketchCanvas.tsx'
import SketchToolbar from './components2/SketchToolbar.tsx'
import VideoControls from './components2/VideoControls.tsx'

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