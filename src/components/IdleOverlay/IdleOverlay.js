"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Howler } from "howler";

const IDLE_TIMEOUT_MS = 60_000; // 60 seconds

export default function IdleOverlay({ children }) {
  const [isIdle, setIsIdle] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const timerRef = useRef(null);
  const idleRef = useRef(false);
  const { currentTrackSrc, howlRef, openIdleOverlayRef } = useMusicPlayer();
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const noAudioFramesRef = useRef(0);
  const [viewPortSize, setViewPortSize] = useState({ width: 0, height: 0 });

  // Expose manual trigger via context
  useEffect(() => {
    openIdleOverlayRef.current = () => setIsIdle(true);
  }, [openIdleOverlayRef]);

  // Update viewport size on mount and resize
  useEffect(() => {
    function updateSize() {
      setViewPortSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [setViewPortSize]);

  useEffect(() => {
    let cancelled = false;
    async function loadBlob() {
      if (!currentTrackSrc) return;
      try {
        const res = await fetch(`/${currentTrackSrc}`);
        const blob = await res.blob();
        if (!cancelled) setAudioBlob(blob);
      } catch (err) {
        console.error("Failed to load audio for visualizer", err);
      }
    }

    loadBlob();
    return () => {
      cancelled = true;
    };
  }, [currentTrackSrc]);

  // Simple canvas visualizer driven by Howler's master gain node
  useEffect(() => {
    if (!isIdle) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      noAudioFramesRef.current = 0;
      return;
    }
    const ctx = Howler.ctx;
    if (!ctx || !howlRef.current) return;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.75;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    // tap into the master gain without breaking existing routing
    Howler.masterGain.connect(analyser);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");

    // Precompute gradient ONCE outside render loop
    const { width, height } = canvas;
    const gradientX = canvasCtx.createLinearGradient(0, 0, width, 0);
    gradientX.addColorStop(0, "#00ffff");
    gradientX.addColorStop(0.5, "#00ccff");
    gradientX.addColorStop(1, "#0099ff");

    // Soft glow: disable on iOS to prevent throttling
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isIOS) {
      canvasCtx.shadowColor = "rgba(0, 204, 255, 0.35)";
      canvasCtx.shadowBlur = 8;
    }

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, width, height);

      // Check if there's any audio output
      const hasAudio = dataArray.some(value => value > 5);

      if (!hasAudio) {
        noAudioFramesRef.current++;
      } else {
        noAudioFramesRef.current = 0;
      }

      // Only show message after 90 frames (~3 seconds at 30fps) of no audio
      const showNoAudioMessage = noAudioFramesRef.current > 90;

      if (showNoAudioMessage) {
        // No audio detected for buffer period - show message
        canvasCtx.fillStyle = "#00ccff";
        canvasCtx.font = "32px 'Segoe UI Variable', 'Segoe UI', sans-serif";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "middle";
        canvasCtx.fillText("No Audio To Visualize 😿", width / 2, height / 2);
      } else {
        // Audio detected or within buffer period - show visualizer
        const targetBarWidth = 8;
        const barCount = Math.min(128, Math.max(32, Math.floor(width / targetBarWidth)));
        const step = Math.max(1, Math.floor(bufferLength / barCount));
        const barWidth = width / barCount;
        const midY = height / 2;
        
        // Set fill style once before the loop for better performance
        canvasCtx.fillStyle = gradientX;

        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i * step] / 255;
          // Less aggressive scaling to make all frequencies more perceptible
          const amplified = Math.min(1, Math.pow(value, 1.5) * 1.3);
          const barHeight = amplified * (height / 2);

          // Bottom-left (downward)
          canvasCtx.fillRect(i * barWidth, midY - 1, Math.max(1, barWidth - 1), barHeight);
          // Bottom-right (downward mirrored)
          canvasCtx.fillRect(width - (i + 1) * barWidth, midY - 1, Math.max(1, barWidth - 1), barHeight);

          // Top-left (upward)
          canvasCtx.fillRect(i * barWidth, midY + 1 - barHeight, Math.max(1, barWidth - 1), barHeight);
          // Top-right (upward mirrored)
          canvasCtx.fillRect(width - (i + 1) * barWidth, midY + 1 - barHeight, Math.max(1, barWidth - 1), barHeight);
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      analyser.disconnect();
    };
  }, [isIdle, howlRef]);

  useEffect(() => {
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keypress",
      "touchstart",
      "scroll",
      "wheel",
    ];

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (idleRef.current) {
        setIsIdle(false);
      }

      idleRef.current = false;
      timerRef.current = setTimeout(() => {
        idleRef.current = true;
        setIsIdle(true);
      }, IDLE_TIMEOUT_MS);
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return (
    <>
      {isIdle && (
        <div className="idle-overlay" aria-label="Idle black screen" onClick={() => setIsIdle(false)}>
          <canvas 
            ref={canvasRef} 
            width={viewPortSize.width} 
            height={Math.min(viewPortSize.height * 0.3, 250)} 
          />
        </div>
      )}
      {children}
    </>
  );
}
