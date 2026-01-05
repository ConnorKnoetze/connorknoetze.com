'use client';

import "@/styles/Panels/Panel/Panel.css";
import "@/styles/Panels/WelcomePanel/WelcomePanel.css";
import WindowControls from "../../WindowControls/WindowControls";

export default function WelcomePanel(){
    return (
        <div className="welcome-panel-content" onClick={(e) => e.stopPropagation()}>
            <div className="welcome-panel-header">
                <WindowControls panelName="welcome"/>
            </div>
            <div className="welcome-panel-body">
                <section className="welcome-hero">
                    <div className="welcome-copy">
                        <p className="welcome-eyebrow">Welcome desk</p>
                        <h2 className="welcome-title">Hey, I am Connor — this desktop is your quick tour of my work.</h2>
                        <p className="welcome-lede">This panel is the map, not the resume. Pop open the other windows to see projects, wallpapers, and more detail in About Me.</p>
                    </div>

                    <div className="welcome-highlight-card">
                        <h3>What you will find</h3>
                        <ul className="welcome-list">
                            <li><span className="dot success" />About Me: the full story, contact links, and recent work.</li>
                            <li><span className="dot info" />Projects: a sorted list with details and links.</li>
                            <li><span className="dot neutral" />Wallpapers: swap backgrounds; my personal section of wallpapers I actually use.</li>
                        </ul>
                    </div>
                </section>

                <section className="welcome-grid">
                    <div className="welcome-card">
                        <div className="welcome-card-label">Styling</div>
                        <h3>Windows 11-inspired, tactile</h3>
                        <p>Glassmorphic panels, soft shadows, and a centered desktop layout keep everything legible over the dynamic wallpapers.</p>
                        <ul className="welcome-list">
                            <li><span className="dot info" />Acrylic-like surfaces with blurred backgrounds.</li>
                            <li><span className="dot success" />Rounded corners and gentle depth for a desktop feel.</li>
                            <li><span className="dot neutral" />Accent blue for controls and call-to-actions.</li>
                        </ul>
                    </div>

                    <div className="welcome-card">
                        <div className="welcome-card-label">How to use</div>
                        <h3>Quick tour</h3>
                        <ul className="welcome-list">
                            <li><span className="dot success" />Use the window controls to minimize, maximize, or close panels.</li>
                            <li><span className="dot info" />Open the Projects window to browse repos; double-click a folder to view details.</li>
                            <li><span className="dot neutral" />Swap wallpapers in the Wallpaper panel; the UI adapts to keep text readable.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}