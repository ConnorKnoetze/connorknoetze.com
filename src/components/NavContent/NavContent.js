'use client'
// import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { getCurrentWallpaper } from '@/utils/getCurrentWallpaper';

export default function NavContent(){
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [trayOpen, setTrayOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    useEffect(() => {
        // Function to update time and date
        const updateDateTime = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
            const date = now.toLocaleDateString();
            setCurrentTime(time);
            setCurrentDate(date);
        };

        updateDateTime();

        // Update every 5 seconds (5000ms)
        const interval = setInterval(updateDateTime, 5000);

        return () => clearInterval(interval);
    }, []);

    // Toggle tray open/close state
    const handleTrayClick = () => {
        setIsRotated(!isRotated);
        setTrayOpen(!trayOpen);
    };

    return (
        <nav className="w-full bg-[color-mix(in_srgb,var(--color-gray-950),transparent_40%)] backdrop-blur-lg border-t border-[color-mix(in_srgb,var(--color-blue-500),transparent_99%)] saturate-150">
            <div className="icon-wrapper">
                <div className="nav-items">
                    <button 
                        className="nav-item"
                        type='button'
                        onClick={() => {
                            window.location.href = `/desktop?w=${getCurrentWallpaper()}`;
                        }}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs>
                                <linearGradient id="win32Grad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#6EC3FF"/>
                                <stop offset="100%" stopColor="#4F6BFF"/>
                                </linearGradient>
                            </defs>

                            <rect x="3" y="4" width="11" height="9" rx="3" fill="url(#win32Grad)" />

                            <rect x="18" y="3" width="11" height="10" rx="3" fill="url(#win32Grad)" />

                            <rect x="4" y="18" width="10" height="10" rx="3" fill="url(#win32Grad)" />

                            <rect x="18" y="17" width="10" height="11" rx="3" fill="url(#win32Grad)" />
                        </svg>
                    </button>
                    <button 
                        className="nav-item"
                        type='button'
                        onClick={() => {
                            window.open('https://www.google.com', '_blank');
                        }}
                        aria-label='google'
                    >
                        <img src="/images/icons/google.png"/>
                    </button>
                    <button 
                        className="nav-item"
                        type='button'
                        onClick={() => {
                            window.location.href = `/desktop?w=${getCurrentWallpaper()}`;
                        }}
                        aria-label='folder'
                    >
                        <img src="/images/folder.png"/>
                    </button>
                </div>
                <span className="widgets-area">
                    <div className="widget-item" style={{padding: '15px 8px', userSelect: 'none', cursor: 'pointer'}} onClick={handleTrayClick}>
                        <img style={{width: '11px', transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}} src="/images/tray/tray.png"/>
                    </div>
                    <div className="widget-item">
                        <img className='invert' src="/images/tray/wifi.png"/>
                        <img src="/images/tray/volume.png"/>
                    </div>
                    <div className="widget-item" style={{flexDirection: 'column', fontSize: '12px', lineHeight: '1', padding: '6px 8px', textAlign: 'center'}}>
                        <div className="time">
                            {currentTime}
                        </div>
                        <div className="date">
                            {currentDate}
                        </div>
                    </div>
                </span>
            </div>
            <div className='tray bg-[color-mix(in_srgb,var(--color-neutral-800),transparent_10%)] backdrop-blur-3xl border-t border-[color-mix(in_srgb,var(--color-blue-500),transparent_99%)]' style={{opacity: trayOpen ? '1' : '0', pointerEvents: trayOpen ? 'auto' : 'none', bottom: trayOpen ? '65px' : '55px', transition: trayOpen ? 'bottom 200ms ease-in-out' :'bottom 150ms ease-in-out, opacity 100ms ease-in-out 90ms'}}>
                <span>
                    <button className='trayButton' name='github' onClick={() => {
                            window.open('https://github.com/ConnorKnoetze', '_blank');
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                    </button>
                    <button className='trayButton' name='linkedin' onClick={() => {
                            window.open('https://www.linkedin.com/in/connorknoetze/', '_blank');
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#0369A1" className="bi bi-linkedin bg-white rounded-sm" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.521-1.248-1.342-1.248-.821 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v4.865h2.4V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                    </button>
                </span>
            </div>
        </nav>
    )
}