import { createContext, useState, useCallback } from 'react';

export const VideoSetting = createContext({
    currentVideoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    playbackSpeed: 1,
    muted: false,
    playStatus: false,
    setPlayStatus: (status: boolean) => {true},
    volumeLevel: 0.5,
    updateProgress: (e: any) => { },
    setPlaybackSpeed: (speed: number) => {},
    setVolumeLevel: (level: number) => {},
    toggleMute: () => {},
});

export const VideoSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentVideoUrl, setCurrentVideoUrl] = useState('https://www.youtube.com/watch?v=jfKfPfyJRdk');
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [muted, setMuted] = useState(false);
    const [playStatus, setPlayStatus] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0.5);

    const toggleMute = useCallback(() => setMuted((prev) => !prev), []);

    return (
        <VideoSetting.Provider value={{
            currentVideoUrl,
            playbackSpeed,
            muted,
            playStatus,
            setPlayStatus,
            volumeLevel,
            updateProgress: (e) => {},
            setPlaybackSpeed,
            setVolumeLevel,
            toggleMute,
        }}>
            {children}
        </VideoSetting.Provider>
    );
};