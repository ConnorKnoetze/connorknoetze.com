'use client';

import { forwardRef } from 'react';
import MusicPlayer from './MusicPlayer/MusicPlayer';

const MusicPlayerContainer = forwardRef((props, ref) => {
  return <MusicPlayer ref={ref} />;
});

MusicPlayerContainer.displayName = 'MusicPlayerContainer';

export default MusicPlayerContainer;
