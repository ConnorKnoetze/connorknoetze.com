'use client';

import { useEffect } from "react";

import "@/styles/WindowControls/WindowControls.css";

export default function WindowControls({ panelName, maximized }) {
    const isMaximized = maximized === true || (typeof maximized === 'object' && maximized.maximized === true);

    function getPanelContentIsMaximized() {
        if (typeof document === 'undefined') return false;
        const panelContent =
            document.querySelector(`.${panelName}-panel-content`) ||
            document.querySelector(`.${panelName}-panel-content.maximized`);

        if (!panelContent) return false;
        return panelContent.classList.contains('maximized');
    }

    function closeWindow(panelName) {
        if (typeof document === 'undefined') return;
        const Panel = document.querySelector(`.${panelName}-panel-active`);
        if (Panel) Panel.className = `${panelName}-panel`;

        const musicPlayer = document.querySelector('.music-player-container.minimized') || document.querySelector('.music-player-container.expanded');
        musicPlayer.classList.remove('hidden');
    }

    function maximizeWindow(panelName) {
        if (typeof document === 'undefined') return;
        const PanelContent =
            document.querySelector(`.${panelName}-panel-content`) ||
            document.querySelector(`.${panelName}-panel-content.maximized`);
        if (PanelContent) PanelContent.classList.toggle('maximized');

        const musicPlayer = document.querySelector('.music-player-container.minimized') || document.querySelector('.music-player-container.expanded');
        musicPlayer.classList.toggle('hidden');
    }

    useEffect(() => {
        if (isMaximized || getPanelContentIsMaximized()) {
            maximizeWindow(panelName);
        }
    }, [panelName, isMaximized]);

    return (
        <div className="window-controls">
            <div className="window-control-button" onClick={() => closeWindow(panelName)}>
                <img className="window-control-icon" src={`${process.env.NEXT_PUBLIC_CDN_BASE}WindowControls/remove.png`} alt="Minimize Icon"/>
            </div>
            <div className="window-control-button" onClick={() => maximizeWindow(panelName)}>
                <img className="window-control-icon" src={`${process.env.NEXT_PUBLIC_CDN_BASE}WindowControls/stop.png`} alt="Maximize Icon"/>
            </div>
            <div className="window-control-button close" onClick={() => closeWindow(panelName)}>
                <img className="window-control-icon" src={`${process.env.NEXT_PUBLIC_CDN_BASE}WindowControls/close.png`} alt="Close Icon"/>
            </div>
        </div>
    );
}