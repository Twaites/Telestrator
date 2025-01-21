import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  currentVideoUrl: string;
  playbackSpeed: number;
  muted: boolean;
  playStatus: boolean;
  volumeLevel: number;
  videoProgress: number;
}

const initialState: VideoState = {
  currentVideoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  playbackSpeed: 1,
  muted: false,
  playStatus: false,
  volumeLevel: 0.5,
  videoProgress: 0
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.currentVideoUrl = action.payload;
    },
    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
    setPlayStatus: (state, action: PayloadAction<boolean>) => {
      state.playStatus = action.payload;
    },
    setVolumeLevel: (state, action: PayloadAction<number>) => {
      state.volumeLevel = action.payload;
    },
    setVideoProgress: (state, action: PayloadAction<number>) => {
      state.videoProgress = action.payload;
    }
  }
});

export const {
  setVideoUrl,
  setPlaybackSpeed,
  toggleMute,
  setPlayStatus,
  setVolumeLevel,
  setVideoProgress
} = videoSlice.actions;

export default videoSlice.reducer; 