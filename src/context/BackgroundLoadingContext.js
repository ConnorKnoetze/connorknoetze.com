'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BackgroundLoadingContext = createContext();

export function BackgroundLoadingProvider({ children }) {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  useEffect(() => {
    const checkBackgroundImage = () => {
      const backgroundUrl = getComputedStyle(document.body).backgroundImage;
      
      if (backgroundUrl && backgroundUrl !== 'none') {
        const urlMatch = backgroundUrl.match(/url\(["']?(.+?)["']?\)/);
        if (urlMatch) {
          const img = new Image();
          img.onload = () => setIsBackgroundLoaded(true);
          img.onerror = () => setIsBackgroundLoaded(true); // Mark as loaded even on error
          img.src = urlMatch[1];
        }
      } else {
        setIsBackgroundLoaded(true);
      }
    };

    // Give the DOM time to apply the CSS
    const timeout = setTimeout(checkBackgroundImage, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <BackgroundLoadingContext.Provider value={{ isBackgroundLoaded }}>
      {children}
    </BackgroundLoadingContext.Provider>
  );
}

export function useBackgroundLoading() {
  return useContext(BackgroundLoadingContext);
}
