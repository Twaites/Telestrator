import { useState } from 'react';
import { Button, Grid, Slider, Stack, Autocomplete } from '@mui/joy';
import { useVideoStore } from '../state/VideoState';

const playSpeeds = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2x' },
];

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
    setVideoUrl,
    addToUrlHistory,
    setPlaybackSpeed,
    toggleMute,
    setPlayStatus,
    setVolumeLevel,
    setVideoProgress,
    setSeeking
  } = useVideoStore();

  const handleVideoUrlChange = (newUrl: string | null) => {
    if (newUrl && newUrl !== currentVideoUrl) {
      setInputVideoUrl(newUrl);
      setVideoUrl(newUrl);
      addToUrlHistory(newUrl);
    }
  };

  return (
    <Grid paddingBottom={1}>
      <Stack direction="row" spacing={1} paddingBottom={1}>
        <Autocomplete
          sx={{ width: '100%' }}
          placeholder="Enter video URL"
          value={currentVideoUrl}
          options={videoUrlHistory}
         // onChange={(_, value) => handleVideoUrlChange(value)}
          onInputChange={(_, value) => setInputVideoUrl(value)}
          freeSolo
          disableClearable={true}
          openOnFocus={true}
        //   slotProps={{
        //     input: {
        //       onBlur: (e) => handleVideoUrlChange(e.target.value)
        //     }
        //   }}
        />
        <Button
          variant="solid"
          onClick={() => handleVideoUrlChange(inputVideoUrl)}
          disabled={!inputVideoUrl || inputVideoUrl === currentVideoUrl}
        >
          Load Video
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Button onClick={() => setPlayStatus(!playStatus)}>
          {playStatus ? "Pause" : "Play"}
        </Button>
        <Slider
          sx={{
            "--Slider-track-size": "13px",
            width: "100%"
          }}
          value={videoProgress}
          min={0}
          max={1000}
          valueLabelDisplay="off"
          onChange={(_, value) => {
            setSeeking(true);
            setVideoProgress(value as number);
          }}
        />
        <Slider
          aria-label="Playback Speed"
          value={playbackSpeed}
          onChange={(_, value) => setPlaybackSpeed(value as number)}
          step={0.25}
          size='md'
          min={0.25}
          max={2}
          sx={{ width: '30%' }}
          valueLabelDisplay="auto"
          marks={playSpeeds}
        />
        <Slider
          aria-label="Volume"
          value={volumeLevel}
          onChange={(_, value) => setVolumeLevel(value as number)}
          step={0.1}
          min={0}
          max={1}
          valueLabelDisplay="auto"
        />
        <Button onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </Button>
      </Stack>
    </Grid>
  );
};

export default VideoControls;