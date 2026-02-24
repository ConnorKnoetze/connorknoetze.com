'use client';

import "@/styles/Desktop/Desktop.css";
import { useState, useEffect } from 'react';
import WallpaperPanel from "@/components/Panels/WallpaperPanel/WallpaperPanel";
import ProjectPanel from "../Panels/ProjectPanel/ProjectPanel";
import AboutMePanel from "../Panels/AboutMePanel/AboutMePanel";
import WelcomePanel from "../Panels/WelcomePanel/WelcomePanel";
import PerProjectPanel from "../Panels/PerProjectPanel/PerProjectPanel";
import { togglePanels, closeAllPanels } from "@/utils/togglePanels";

export default function DesktopContent(){
    const [clickedItem, setClickedItem] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);

    const [innerWidth, setInnerWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    useEffect(() => {
        function onResize() { setInnerWidth(window.innerWidth); }
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleRepoSelect = (repoName) => {
        setSelectedRepo(repoName);
        const perProjectPanel = document.querySelector('.per-project-panel') || document.querySelector('.per-project-panel-active');
        const musicPlayer = document.querySelector('.music-player-container.minimized') || document.querySelector('.music-player-container.expanded');
        perProjectPanel.className = perProjectPanel.className.includes('per-project-panel-active') ? 'per-project-panel' : 'per-project-panel-active';
        

        const perProjectPanelContent =
            document.querySelector(`.per-project-panel-content`) ||
            document.querySelector(`.per-project-panel-content.maximized`);
        if (perProjectPanelContent && !perProjectPanelContent.classList.contains('maximized') && window.innerWidth < 600) {
            perProjectPanelContent.classList.add('maximized');
        }

        if (perProjectPanelContent && perProjectPanelContent.classList.contains('maximized')) {
            musicPlayer.classList.add('hidden');
        }
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

    // function togglePanel(name) {
    //     // Toggle selected panel visibility
    //     const panel = document.querySelector(`.${name}-panel`) || document.querySelector(`.${name}-panel-active`);
    //     panel.className = panel.className.includes(`${name}-panel-active`) ? `${name}-panel` : `${name}-panel-active`;

    //     const panelContent =
    //         document.querySelector(`.${name}-panel-content`) ||
    //         document.querySelector(`.${name}-panel-content.maximized`);

    //     const musicPlayer = document.querySelector('.music-player-container.minimized') || document.querySelector('.music-player-container.expanded');

    //     if (panelContent && !panelContent.classList.contains('maximized') && innerWidth < 600) {
    //         panelContent.classList.add('maximized');
    //     }

    //     if (panelContent && panelContent.classList.contains('maximized')) {
    //         musicPlayer.classList.toggle('hidden');
    //     }
    // }

    return (
        <div className="desktop-content">
            <div className="icon-grid" onClick={(e) => {clearHighlight(e);}}>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanels('welcome')}>
                    <img src="/images/icons/Windows_Notepad_icon.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">Welcome!</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanels('about-me')}>
                    <img src="/images/icons/pdf.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">About Me</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanels('project')}>
                    <img src="/images/folder.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">Projects</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => togglePanels('wallpaper')}>
                    <img src="/images/icons/photos.png" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">Wallpapers</span>
                </div>
                <div className="icon-item" onClick={doClickHighlight} onDoubleClick={() => window.open('https://pantry.connorknoetze.com', '_blank')}>
                    <img src="/images/icons/pantry.svg" alt="Home Icon" className="icon-image"/>
                    <span className="icon-label">PantryPal</span>
                </div>
            </div>

            <div className="welcome-panel-active" name="welcome" onClick={() => togglePanels('welcome')}>
                <WelcomePanel/>
            </div>

            <div className="about-me-panel" name="about-me" onClick={() => togglePanels('about-me')}>
                <AboutMePanel/>
            </div>

            <div name="project" className="project-panel" onClick={() => togglePanels('project')}>
                <ProjectPanel onRepoSelect={handleRepoSelect}/>
            </div>

            <div name="wallpaper" className="wallpaper-panel" onClick={() => togglePanels('wallpaper')}>
                <WallpaperPanel/>
            </div>

            <div className="per-project-panel" name="per-project" onClick={() => togglePanels('per-project')}>
                <PerProjectPanel name={selectedRepo}/>
            </div>
            
        </div>
    )
}