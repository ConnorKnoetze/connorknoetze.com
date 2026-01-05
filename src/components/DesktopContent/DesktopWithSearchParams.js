'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DesktopContent from '@/components/DesktopContent/DesktopContent'
import setAsWallpaper from '@/utils/setAsWallpaper';

export default function DesktopWithSearchParams(){
    const searchParams = useSearchParams();
    const wallpaper = searchParams.get('w');

    useEffect(() => {
        if (wallpaper) {
            setAsWallpaper(wallpaper);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [wallpaper]);

    return <DesktopContent/>
}
