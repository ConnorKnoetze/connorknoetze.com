'use client';
import "@/styles/WindowControls/WindowControls.css";

export default function WindowControls({ panelName }){
    function closeWindow(panelName) {
        const Panel = document.querySelector(`.${panelName}-panel-active`);
        Panel.className = `${panelName}-panel`;
    }

    function maximizeWindow(panelName) {
        const PanelContent = document.querySelector(`.${panelName}-panel-content`);
        const musicPlayer = document.querySelector('.music-player-container.minimized');
        musicPlayer.classList.toggle('hidden');
        PanelContent.classList.toggle('maximized');
    }

    return (
        <div className="window-controls">
            <div className="window-control-button" onClick={() => closeWindow(panelName)}>
                <img className="window-control-icon" src="/images/WindowControls/remove.png" alt="Minimize Icon"/>
            </div>
            <div className="window-control-button" onClick={() => maximizeWindow(panelName)}>
                <img className="window-control-icon" src="/images/WindowControls/stop.png" alt="Maximize Icon"/>
            </div>
            <div className="window-control-button close" onClick={() => closeWindow(panelName)}>
                <img className="window-control-icon" src="/images/WindowControls/close.png" alt="Close Icon"/>
            </div>
        </div>
    );
}