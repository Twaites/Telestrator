import './Telestrator.css'
import VideoPlayer from './Components/VideoPlayer'
import SketchCanvas from './Components/SketchCanvas'
import SketchToolbar from './Components/SketchToolbar'
import { SketchSettingsProvider } from './Context/SketchSettings'
import VideoControls from './Components/VideoControls'

function Telestrator() {

  return (
    <SketchSettingsProvider>
      <div id="ReactPlayerAndSketchWrapper">
        <VideoPlayer />
        <SketchCanvas />
        <SketchToolbar />
        <VideoControls />
      </div>
    </SketchSettingsProvider>
  )
}

export default Telestrator