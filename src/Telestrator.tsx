import './Telestrator.css'
import VideoPlayer from './components/VideoPlayer'
import SketchCanvas from './components/SketchCanvas'
import SketchToolbar from './components/SketchToolbar'
import VideoControls from './components/VideoControls'

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