import { create } from 'zustand';
import ReactPlayer from 'react-player';

interface VideoState {
  currentVideoUrl: string;
  videoUrlHistory: string[];
  playbackSpeed: number;
  muted: boolean;
  playStatus: boolean;
  volumeLevel: number;
  videoProgress: number;
  seeking: boolean;
  duration: number;
  isLive: boolean;
  playerRef: React.RefObject<ReactPlayer> | null;
  setVideoUrl: (url: string) => void;
  addToUrlHistory: (url: string) => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleMute: () => void;
  setPlayStatus: (status: boolean) => void;
  setVolumeLevel: (level: number) => void;
  setVideoProgress: (progress: number) => void;
  setSeeking: (seeking: boolean) => void;
  setDuration: (duration: number) => void;
  setIsLive: (isLive: boolean) => void;
  setPlayerRef: (ref: React.RefObject<ReactPlayer>) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  videoUrlHistory: ['https://www.youtube.com/watch?v=jfKfPfyJRdk'],
  playbackSpeed: 1,
  muted: false,
  playStatus: false,
  volumeLevel: 0.5,
  videoProgress: 0,
  seeking: false,
  duration: 0,
  isLive: false,
  playerRef: null,
  setVideoUrl: (currentVideoUrl) => set({ currentVideoUrl }),
  addToUrlHistory: (url) => set((state) => ({
    videoUrlHistory: [...new Set([url, ...state.videoUrlHistory])].slice(0, 10)
  })),
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  setPlayStatus: (playStatus) => set({ playStatus }),
  setVolumeLevel: (volumeLevel) => set({ volumeLevel }),
  setVideoProgress: (videoProgress) => set({ videoProgress }),
  setSeeking: (seeking) => set({ seeking }),
  setDuration: (duration) => set({ duration }),
  setIsLive: (isLive) => set({ isLive }),
  setPlayerRef: (playerRef) => set({ playerRef }),
})); 