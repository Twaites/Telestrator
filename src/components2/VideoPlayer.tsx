import ReactPlayer from 'react-player';
import { useVideoStore } from '../state/VideoState';

export default function VideoPlayer() {
  const { 
    currentVideoUrl,
    playbackSpeed,
    muted,
    playStatus,
    volumeLevel,
    setPlayStatus,
    setVideoProgress
  } = useVideoStore();

  return (
    <ReactPlayer
      className='react-player'
      playbackRate={playbackSpeed}
      muted={muted}
      controls={false}
      url={currentVideoUrl}
      width='100%'
      height='100%'
      playing={playStatus}
      onPause={() => setPlayStatus(false)}
      onEnded={() => setPlayStatus(false)}
      volume={volumeLevel}
      onProgress={e => setVideoProgress(e.played * 1000)}
      onError={e => console.log('onError', e)}
    />
  );
}