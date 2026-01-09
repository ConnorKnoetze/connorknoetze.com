"use client";

import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";

import "@/styles/MusicPlayer/MusicPlayer.css";

const TRACKS = [
    "music/breezy-point-auv-main-version-34802-02-21.mp3",
    "music/rain-on-waverly-auv-main-version-27006-03-19.mp3",
    "music/second-stop-cafe-auv-main-version-32211-02-34.mp3",
];

const TRACK_NAMES = [
    "Breezy Point",
    "Rain on Waverly",
    "Second Stop Cafe",
];

export default function MusicPlayer() {
    const soundRef = useRef(null);
    const playerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const howl = createHowl(0);
        soundRef.current = howl;
        if (isMuted) {
            howl.mute(true);
        }
        howl.play();
        return () => {
            howl.unload();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsMinimized(true), 7500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Initialize slider CSS variable on mount
        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.style.setProperty('--track-fill', '10%');
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (playerRef.current && !playerRef.current.contains(e.target)) {
                setIsMinimized(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function createHowl(index) {
        return new Howl({
            src: [TRACKS[index]],
            volume: 0.05,
            onend: handleEnd,
        });
    }

    function handleEnd() {
        nextTrack();
    }

    function loadTrack(index) {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
        }
        const howl = createHowl(index);
        soundRef.current = howl;
        if (isMuted) {
            howl.mute(true);
        }
        howl.play();
        setIsPlaying(true);
    }

    function toggleSound() {
        const current = soundRef.current;
        if (!current) return;
        if (current.playing()) {
            current.pause();
            setIsPlaying(false);
        } else {
            current.play();
            setIsPlaying(true);
        }
    }

    function nextTrack() {
        setCurrentIndex((prev) => {
            const next = (prev + 1) % TRACKS.length;
            loadTrack(next);
            return next;
        });
    }

    function previousTrack() {
        setCurrentIndex((prev) => {
            const prevIndex = (prev - 1 + TRACKS.length) % TRACKS.length;
            loadTrack(prevIndex);
            return prevIndex;
        });
    }

    function toggleMute() {
        if (!soundRef.current) return;
        const newMuted = !isMuted;
        soundRef.current.mute(newMuted);
        setIsMuted(newMuted);
    }

    function setVolume(volume) {
        if (soundRef.current) {
            soundRef.current.volume(volume);
        }
        // Update CSS variable for progress bar
        const slider = document.getElementById('volume-slider');
        if (slider) {
            const percentage = (volume * 200) + '%';
            slider.style.setProperty('--track-fill', percentage);
        }
    }

    function toggleMinimize() {
        setIsMinimized((prev) => !prev);
    }

    return (
        <div
            ref={playerRef}
            className={`music-player-container ${isMinimized ? "minimized" : "expanded"}`}
            onClick={isMinimized ? toggleMinimize : undefined}
        >
            {!isMinimized && (
                <div className="music-player-body">
                    <div
                        className={`music-player-handle ${isMinimized ? "minimized" : "expanded"}`}
                        onClick={toggleMinimize}
                    ></div>
                    <div className="music-player-title">Now Playing</div>
                    <div className="artist-thumbnail">
                        <img src="/images/music/auv.png" alt="Artist Thumbnail" />
                    </div>
                    <div className="music-player-track-info">{TRACK_NAMES[currentIndex]}</div>
                    <div className="music-player-track-info pointer-events-auto"><button>auv</button></div>
                    <div className="music-player-controls">
                        <button onClick={previousTrack}><img src="/images/music/prev-track.png"></img></button>
                        <button onClick={toggleSound}>{isPlaying ? <img src="/images/music/pause.png"></img> : <img src="/images/music/play.png"></img>}</button>
                        <button onClick={nextTrack}><img src="/images/music/next-track.png"></img></button>
                        <button className="mute-button" onClick={toggleMute}>{isMuted ? <img src="/images/music/muted.png"></img> : <img src="/images/music/volume.png"></img>}</button>
                    </div>
                    <div className="music-player-volume">
                        <input
                            id="volume-slider"
                            name="volume"
                            type="range"
                            min="0"
                            max="0.5"
                            step="0.01"
                            defaultValue="0.05"
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            )}
            {isMinimized && <div className="minimized-player">
                <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 48 48" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                <defs>
                    <linearGradient id="blueSteelGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d4d4d4"/>
                    <stop offset="50%" stopColor="#b8b8b8"/>
                    <stop offset="100%" stopColor="#9e9e9e"/>
                    </linearGradient>
                </defs>

                <path 
                    d="M10 18 H18 L26 12 V36 L18 30 H10 Z"
                    fill="url(#blueSteelGrad)"
                />

                <path 
                    d="M30 18 C34 20 34 28 30 30" 
                    stroke="url(#blueSteelGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                
                <path 
                    d="M34 14 C40 18 40 30 34 34" 
                    stroke="url(#blueSteelGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                </svg>

            </div>}
        </div>
    );
}