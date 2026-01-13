'use client';

import { useBackgroundLoading } from '@/context/BackgroundLoadingContext';

export default function Loading() {
  const { isBackgroundLoaded } = useBackgroundLoading();

  if (isBackgroundLoaded) {
    return null;
  }

  return (
    <div className="loading-container">
      <div className='loading-content'>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-text">Getting Things Ready For You...</p>
      </div>
    </div>
  );
}
