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
    setPlayerRef,
    setPlaybackSpeed,
    setVolumeLevel,
    toggleMute
  } = useVideoStore();

  useEffect(() => {
    setPlayerRef(playerRef);
    return () => {
      setPlayerRef(null);
    };
  }, [setPlayerRef]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent default behavior for these keys
      if (['Space', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
        event.preventDefault();
      }

      // Ignore if any modifier keys are pressed
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return;
      }

      switch (event.code) {
        
        // Play/Pause - Space or K
        case 'Space':
        case 'KeyK':
          setPlayStatus(!playStatus);
          break;

        // Speed controls - Left/Right arrows
        case 'KeyJ':
          setPlaybackSpeed(Math.max(0.25, playbackSpeed - 0.25));
          break;
        case 'KeyL':
          setPlaybackSpeed(Math.min(1, playbackSpeed + 0.25));
          break;

        // Volume controls - Up/Down arrows
        case 'ArrowUp':
          setVolumeLevel(Math.min(1, volumeLevel + 0.1));
          break;
        case 'ArrowDown':
          setVolumeLevel(Math.max(0, volumeLevel - 0.1));
          break;

        // Mute - M
        case 'KeyM':
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playStatus, playbackSpeed, volumeLevel, setPlayStatus, setPlaybackSpeed, setVolumeLevel, toggleMute]);

  const handleError = (error: any) => {
    console.error('Video playback error:', error);
    // You could add error state to VideoState and show an error message
  };

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
      onError={handleError}
      onDuration={(duration) => {
        setDuration(duration);
        setIsLive(duration === Infinity);
      }}
    />
  );
}