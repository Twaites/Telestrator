import { useState, useCallback } from 'react';
import { Button, Slider, Stack, Autocomplete, IconButton, Box, Tooltip } from '@mui/joy';
import { useVideoStore } from '../state/VideoState';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../utils/formatTime';
import SpeedMenu from './SpeedMenu';

const VideoControls = () => {
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  
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

  const handleSeek = useCallback((_: Event, value: number | number[]) => {
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
    <Stack spacing={1} sx={{ width: '100%', p: 1}}>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          sx={{ 
            width: '100%',
            py:0,
          }}
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
          sx={{ bgcolor: '#2196f3', minWidth: 110 }}
          onClick={() => handleVideoUrlChange(inputVideoUrl)}
          disabled={!inputVideoUrl || inputVideoUrl === currentVideoUrl}
          size="sm"
        >
          Load Video
        </Button>
      </Stack>

      <Stack spacing={0.5} sx={{ p: 0, borderRadius: '4px' }}>
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
            <Tooltip title={playStatus ? "Pause (k)" : "Play (k)"}>
              <IconButton
                variant="plain"
                onClick={handlePlayPause}
                color="primary"
              >
                {playStatus ? <Pause size={20} /> : <Play size={20} />}
              </IconButton>
            </Tooltip>

            {!isLive && (
              <Slider
                sx={{
                  flex: 1,
                  py: 1,
                  px: 2,
                }}
                value={videoProgress}
                min={0}
                max={1000}
                valueLabelDisplay="off"
                onChange={handleSeek}
                onChangeCommitted={handleSeekCommitted}
                disabled={isLive}
                color="neutral"
              />
            )}

            <span style={{ 
              fontFamily: 'sans-serif', 
              fontSize: '0.875rem', 
              minWidth: 100, 
              textAlign: 'center', 
              paddingLeft: 10 
            }}>
              {isLive ? 'LIVE' : `${formatTime(currentTime)} / ${formatTime(duration)}`}
            </span>

            <SpeedMenu 
              playbackSpeed={playbackSpeed}
              onSpeedChange={handleSpeedChange}
            />

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={muted ? "Unmute (M)" : "Mute (M)"}>
                <IconButton
                  variant="plain"
                  onClick={toggleMute}
                  color="primary"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </IconButton>
              </Tooltip>
              <Box paddingX={1}>
              <Slider
                aria-label="Volume"
                value={volumeLevel}
                variant="soft"
                onChange={handleVolumeChange}
                step={0.1}
                min={0}
                max={1}
                sx={{ 
                  width: 150,
                  pl: 0,
                }}
                size="sm"
                color="primary"
              />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoControls;