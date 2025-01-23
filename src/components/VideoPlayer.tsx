import { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useVideoStore } from '../state/VideoState';

export default function VideoPlayer() {
  const playerRef = useRef<ReactPlayer>(null);
  const { 
    currentVideoUrl,
    playbackSpeed,
    muted,
    playStatus,
    volumeLevel,
    seeking,
    setPlayStatus,
    setVideoProgress,
    setDuration,
    setIsLive,
    setPlayerRef
  } = useVideoStore();

  useEffect(() => {
    setPlayerRef(playerRef);
  }, [setPlayerRef]);

  return (
    <ReactPlayer
      ref={playerRef}
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
      onProgress={e => {
        if (!seeking) {
          setVideoProgress(e.played * 1000);
        }
      }}
      onError={e => console.log('onError', e)}
      onDuration={(duration) => {
        setDuration(duration);
        setIsLive(duration === Infinity);
      }}
    />
  );
}