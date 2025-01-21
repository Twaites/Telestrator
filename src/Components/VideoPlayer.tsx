import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { setPlayStatus, setVideoProgress } from '../store/videoSlice';
import type { RootState } from '../store';

export default function VideoPlayer() {
  const _player = useRef<any>();
  const dispatch = useDispatch();
  const { 
    currentVideoUrl,
    playbackSpeed,
    muted,
    playStatus,
    volumeLevel,
  } = useSelector((state: RootState) => state.video);

  return (
    <ReactPlayer
      className='react-player'
      ref={_player}
      playbackRate={playbackSpeed}
      muted={muted}
      controls={false}
      url={currentVideoUrl}
      width='100%'
      height='100%'
      playing={playStatus}
      onPause={() => dispatch(setPlayStatus(false))}
      onEnded={() => dispatch(setPlayStatus(false))}
      volume={volumeLevel}
      onProgress={e => dispatch(setVideoProgress(e.played * 1000))}
      onError={e => console.log('onError', e)}
    />
  );
}