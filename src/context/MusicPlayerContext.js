'use client';

import { createContext, useContext, useRef, useState } from 'react';

const MusicPlayerContext = createContext(null);

export function MusicPlayerProvider({ children }) {
  const musicPlayerRef = useRef(null);
  const howlRef = useRef(null);
  const [currentTrackSrc, setCurrentTrackSrc] = useState(null);
  const openIdleOverlayRef = useRef(null);

  return (
    <MusicPlayerContext.Provider
      value={{ musicPlayerRef, howlRef, currentTrackSrc, setCurrentTrackSrc, openIdleOverlayRef }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  }
  return context;
}
