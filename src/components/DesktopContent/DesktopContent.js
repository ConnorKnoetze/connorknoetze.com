'use client';

import "@/styles/Desktop/Desktop.css";
import { useState, useEffect } from 'react';
import WallpaperPanel from "@/components/Panels/WallpaperPanel/WallpaperPanel";
import ProjectPanel from "../Panels/ProjectPanel/ProjectPanel";
import AboutMePanel from "../Panels/AboutMePanel/AboutMePanel";
import WelcomePanel from "../Panels/WelcomePanel/WelcomePanel";
import PerProjectPanel from "../Panels/PerProjectPanel/PerProjectPanel";

export default function DesktopContent(){
    const [clickedItem, setClickedItem] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);

    const handleRepoSelect = (repoName) => {
        setSelectedRepo(repoName);
        const perProjectPanel = document.querySelector('.per-project-panel') || document.querySelector('.per-project-panel-active');
        perProjectPanel.className = perProjectPanel.className.includes('per-project-panel-active') ? 'per-project-panel' : 'per-project-panel-active';
    };

    useEffect(() => {
        document.addEventListener('keydown', closePanelOnEscape);
        return () => document.removeEventListener('keydown', closePanelOnEscape);
    }, []);

    function closePanelOnEscape(e) {
        if (e.key === 'Escape') {
            const activePanels = document.querySelectorAll('[class$="-panel-active"]');
            activePanels.forEach(panel => {
                panel.className = panel.className.replace('-active', '');
            });
        }
    }

    function clearHighlight(e) {
        if (e.target.className.includes('icon-image') || e.target.className.includes('icon-item') || e.target.className.includes('icon-item-clicked')) return;
        clickedItem && (clickedItem.className = 'icon-item');
        setClickedItem(null);
    }

    function doClickHighlight(e) {
        clickedItem && (clickedItem.className = 'icon-item');
        const target = e.currentTarget;
        target.className = target.className.includes('icon-item-clicked') ? 'icon-item' : 'icon-item icon-item-clicked';
        setClickedItem(target);
    }

    function togglePanel(name) {
        // Toggle selected panel visibility
        const panel = document.querySelector(`.${name}-panel`) || document.querySelector(`.${name}-panel-active`);
        panel.className = panel.className.includes(`${name}-panel-active`) ? `${name}-panel` : `${name}-panel-active`;
    }

    function closeMusicPlayer() {
        const musicPlayer = document.querySelector('.music-player-container.expanded');
    }

    return (
        <div className="desktop-content">
            <div className="icon-grid" onClick={(e) => {clearHighlight(e); closeMusicPlayer();}}>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanel('welcome')}>
                    <img src="/images/icons/Windows_Notepad_icon.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">Welcome!</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanel('about-me')}>
                    <img src="/images/icons/pdf.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">About Me</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanel('project')}>
                    <img src="/images/folder.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">Projects</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanel('wallpaper')}>
                    <img src="/images/icons/photos.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">Wallpapers</span>
                </div>
            </div>

            <div className="welcome-panel-active" name="welcome" onClick={() => togglePanel('welcome')}>
                <WelcomePanel/>
            </div>

            <div className="about-me-panel" name="about-me" onClick={() => togglePanel('about-me')}>
                <AboutMePanel/>
            </div>

            <div name="project" className="project-panel" onClick={() => togglePanel('project')}>
                <ProjectPanel onRepoSelect={handleRepoSelect}/>
            </div>

            <div name="wallpaper" className="wallpaper-panel" onClick={() => togglePanel('wallpaper')}>
                <WallpaperPanel/>
            </div>

            <div className="per-project-panel" name="per-project" onClick={() => togglePanel('per-project')}>
                <PerProjectPanel name={selectedRepo}/>
            </div>
            
        </div>
    )
}