import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useVideoStore } from '../store/videoStore';

export default function VideoPlayer() {
  const _player = useRef<any>();
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
      ref={_player}
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