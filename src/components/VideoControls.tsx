import { useState, useCallback } from 'react';
import { Button, Slider, Stack, Autocomplete, IconButton } from '@mui/joy';
import { useVideoStore } from '../state/VideoState';
import { Play, Pause, Volume2, VolumeX, Settings } from 'lucide-react';
import { formatTime } from '../utils/formatTime';
import SpeedMenu from './SpeedMenu';

const VideoControls = () => {
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  const { 
    currentVideoUrl,
    videoUrlHistory,
    playStatus, 
    playbackSpeed, 
    volumeLevel, 
    muted,
    videoProgress,
    playerRef,
    setVideoUrl,
    addToUrlHistory,
    setPlaybackSpeed,
    toggleMute,
    setPlayStatus,
    setVolumeLevel,
    setVideoProgress,
    setSeeking,
    duration,
    isLive
  } = useVideoStore();

  const handleVideoUrlChange = useCallback((newUrl: string | null) => {
    if (newUrl && newUrl !== currentVideoUrl) {
      setInputVideoUrl(newUrl);
      setVideoUrl(newUrl);
      addToUrlHistory(newUrl);
    }
  }, [currentVideoUrl, setVideoUrl, addToUrlHistory]);

  const currentTime = (videoProgress / 1000) * duration;

  const handleVolumeChange = useCallback((_: any, value: number | number[]) => {
    const newVolume = value as number;
    setVolumeLevel(newVolume);
    
    if (newVolume === 0 && !muted) {
      toggleMute();
    } else if (newVolume > 0 && muted) {
      toggleMute();
    }
  }, [muted, setVolumeLevel, toggleMute]);

  const handleSeek = useCallback((_: SliderChangeEvent, value: SliderValue) => {
    setSeeking(true);
    setVideoProgress(value as number);
  }, [setSeeking, setVideoProgress]);

  const handleSeekCommitted = useCallback((_: any, value: number | number[]) => {
    const seekTo = (value as number) / 1000;
    playerRef?.current?.seekTo(seekTo);
    setSeeking(false);
  }, [playerRef, setSeeking]);

  const handlePlayPause = useCallback(() => {
    setPlayStatus(!playStatus);
  }, [playStatus, setPlayStatus]);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
  }, [setPlaybackSpeed]);

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          sx={{ width: '100%' }}
          placeholder="Enter video URL"
          value={currentVideoUrl}
          options={videoUrlHistory}
          onInputChange={(_, value) => setInputVideoUrl(value)}
          freeSolo
          disableClearable={true}
          openOnFocus={true}
        />
        <Button
          variant="solid"
          onClick={() => handleVideoUrlChange(inputVideoUrl)}
          disabled={!inputVideoUrl || inputVideoUrl === currentVideoUrl}
        >
          Load Video
        </Button>
      </Stack>

      <Stack spacing={0.5}>
        {/* Progress bar */}
        {!isLive && (
          <Slider
            sx={{
              '--Slider-track-height': '4px',
              '--Slider-thumb-size': '12px',
              '&:hover': {
                '--Slider-track-height': '6px',
                '--Slider-thumb-size': '14px',
              },
              py: 1
            }}
            value={videoProgress}
            min={0}
            max={1000}
            valueLabelDisplay="off"
            onChange={handleSeek}
            onChangeCommitted={handleSeekCommitted}
            disabled={isLive}
          />
        )}

        {/* Controls bar */}
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              variant="plain"
              onClick={handlePlayPause}
            >
              {playStatus ? <Pause size={20} /> : <Play size={20} />}
            </IconButton>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 200 }}>
              <IconButton
                variant="plain"
                onClick={toggleMute}
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </IconButton>
              <Slider
                aria-label="Volume"
                value={volumeLevel}
                onChange={handleVolumeChange}
                step={0.1}
                min={0}
                max={1}
                sx={{ 
                  width: 100,
                  '--Slider-track-height': '4px',
                  '--Slider-thumb-size': '12px',
                }}
              />
            </Stack>

            <Stack direction="row" spacing={1}>
              <span style={{ fontSize: '0.875rem', color: '#fff' }}>
                {isLive ? 'LIVE' : `${formatTime(currentTime)} / ${formatTime(duration)}`}
              </span>
            </Stack>
          </Stack>

          <SpeedMenu 
            playbackSpeed={playbackSpeed}
            onSpeedChange={handleSpeedChange}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoControls;