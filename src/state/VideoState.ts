import { create } from 'zustand';

interface VideoState {
  currentVideoUrl: string;
  playbackSpeed: number;
  muted: boolean;
  playStatus: boolean;
  volumeLevel: number;
  videoProgress: number;
  seeking: boolean;
  setVideoUrl: (url: string) => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleMute: () => void;
  setPlayStatus: (status: boolean) => void;
  setVolumeLevel: (level: number) => void;
  setVideoProgress: (progress: number) => void;
  setSeeking: (seeking: boolean) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  playbackSpeed: 1,
  muted: false,
  playStatus: false,
  volumeLevel: 0.5,
  videoProgress: 0,
  seeking: false,
  setVideoUrl: (currentVideoUrl) => set({ currentVideoUrl }),
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  setPlayStatus: (playStatus) => set({ playStatus }),
  setVolumeLevel: (volumeLevel) => set({ volumeLevel }),
  setVideoProgress: (videoProgress) => set({ videoProgress }),
  setSeeking: (seeking) => set({ seeking }),
})); 