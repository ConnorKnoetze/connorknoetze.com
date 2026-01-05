'use client';
import "@/styles/WindowControls/WindowControls.css";

export default function WindowControls({ panelName }){
    function closeWindow(panelName) {
        const wallpaperPanel = document.querySelector(`.${panelName}-panel-active`);
        wallpaperPanel.className = `${panelName}-panel`;
    }

    function maximizeWindow(panelName) {
        const wallpaperPanelContent = document.querySelector(`.${panelName}-panel-content`);
        wallpaperPanelContent.classList.toggle('maximized');
    }

    return (
        <div className="window-controls">
            <div className="window-control-button">
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