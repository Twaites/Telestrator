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
      // Prevent handling if user is typing in the address bar
      const target = event.target as HTMLElement;
      const addressBar = document.querySelector('[data-address-bar-container]');
      if (target instanceof HTMLInputElement && addressBar && addressBar.contains(target)) {
        return;
      }

      // Prevent default behavior for volume keys
      if (['ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'k':
          setPlayStatus(!playStatus);
          break;
        case 'j':
          setPlaybackSpeed(Math.max(0.25, playbackSpeed - 0.25));
          break;
        case 'l':
          setPlaybackSpeed(Math.min(1, playbackSpeed + 0.25));
          break;
        case 'm':
          toggleMute();
          break;
        case 'ArrowLeft':
          setVolumeLevel(Math.max(0, volumeLevel - 0.1));
          break;
        case 'ArrowRight':
          setVolumeLevel(Math.min(1, volumeLevel + 0.1));
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