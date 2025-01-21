import './Telestrator.css'
import VideoPlayer from './Components/VideoPlayer'
import SketchCanvas from './Components/SketchCanvas'
import SketchToolbar from './Components/SketchToolbar'
import VideoControls from './Components/VideoControls'

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