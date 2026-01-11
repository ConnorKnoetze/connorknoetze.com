'use client';

import "@/styles/Panels/Panel/Panel.css";
import "@/styles/Panels/WelcomePanel/WelcomePanel.css";
import WindowControls from "../../WindowControls/WindowControls";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import { togglePanels, closeAllPanels } from "@/utils/togglePanels";

// Basic JSON-LD to describe this welcome page context for search engines
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Welcome",
    description:
        "Quick tour of Connor's work with projects, wallpapers, and an about panel.",
};

export default function WelcomePanel() {

    const [innerWidth, setInnerWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    useEffect(() => {
        function onResize() { setInnerWidth(window.innerWidth); }
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const openPanel = (panelName) => {
        // Close welcome panel and open selected panel
        const welcomePanel = document.querySelector('.welcome-panel') || document.querySelector('.welcome-panel-active');
        welcomePanel.className = welcomePanel.className.includes('welcome-panel-active') ? 'welcome-panel' : 'welcome-panel-active';

        const Panel = document.querySelector(`.${panelName}-panel`) || document.querySelector(`.${panelName}-panel-active`);
        Panel.className = Panel.className.includes(`${panelName}-panel-active`) ? `${panelName}-panel` : `${panelName}-panel-active`;
    }

    return (
        <article
            className="welcome-panel-content"
            onClick={(e) => e.stopPropagation()}
            role="region"
            aria-labelledby="welcome-title"
        >
            <div className="welcome-panel-header">
                <WindowControls panelName="welcome" maximized={innerWidth < 600 ? true : false} />
            </div>
            <section className="welcome-panel-body" aria-label="Welcome overview">
                <section className="welcome-hero" aria-label="Intro">
                    <header className="welcome-copy">
                        <p className="welcome-eyebrow">Welcome desk</p>
                        <h1 id="welcome-title" className="welcome-title">Connor Knoetze — Portfolio</h1>
                        <h2 className="welcome-lede">Hey, I am Connor this pseudo desktop is a showcase of my personal projects. </h2>
                        <div className="welcome-cta-row" aria-label="Primary actions">
                            <button className="welcome-cta primary" onClick={() => togglePanels('project')} aria-label="View projects">
                                Browse Projects
                            </button>
                            <button className="welcome-cta secondary" onClick={() => togglePanels('wallpaper')} aria-label="View wallpapers">
                                View Wallpapers
                            </button>
                            <button className="welcome-cta secondary" onClick={() => togglePanels('about-me')} aria-label="View about me">
                                About Me
                            </button>
                        </div>
                    </header>

                    <aside className="welcome-highlight-card" aria-label="Highlights">
                        <h3>What you will find</h3>
                        <ul className="welcome-list">
                            <li><span className="dot success" />About Me: the full story, contact links, and recent work.</li>
                            <li><span className="dot info" />Projects: a sorted list with details and links.</li>
                            <li><span className="dot neutral" />Wallpapers: swap backgrounds; my personal selection of wallpapers.</li>
                        </ul>
                    </aside>
                </section>

                <section className="welcome-grid" aria-label="Details">
                    <div className="welcome-card">
                        <div className="welcome-card-label">How to use</div>
                        <h3>Quick tour</h3>
                        <ul className="welcome-list">
                            <li><span className="dot success" />Use the window controls to minimize, maximize, or close panels.</li>
                            <li><span className="dot info" />Open the Projects window to browse repos; double-click a folder to view details.</li>
                            <li><span className="dot neutral" />Swap wallpapers in the Wallpaper panel; the UI adapts to keep text readable.</li>
                        </ul>
                    </div>
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
                </section>
            </section>

            <div className="welcome-panel-footer">
                <Footer/>
            </div>

            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </article>
    );
}