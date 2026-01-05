'use client';

import WindowControls from "../../WindowControls/WindowControls";
import "@/styles/Panels/Panel/Panel.css";
import "@/styles/Panels/AboutMePanel/AboutMePanel.css";

export default function AboutMePanel(){
    const favoriteProjects = [
        {
            emoji: "😺",
            name: "Pet Social Media",
            summary: "The first social media where only pets can finally profit from absolute human captivation.",
            tech: "Python (Flask) • HTML5 • CSS3 • JavaScript • SQLite • Google Cloud SQL",
        },
        {
            emoji: "🍜",
            name: "Recipes Website",
            summary: "COMPSCI 235 full-stack recipes site built in 60 days using agile practices.",
            tech: "Python (Flask) • HTML5 • CSS3 • SQLite",
        },
        {
            emoji: "🔒",
            name: "Password Manager",
            summary: "A local password manager that encrypts and stores credentials securely.",
            tech: "Java • Swing • AES-256-CBC",
        },
        {
            emoji: "👴",
            name: "AES-256-CBC",
            summary: "My own implementation of the AES-256-CBC encryption algorithm in C.",
            tech: "C • Makefile",
        },
        {
            emoji: "🎯",
            name: "Portfolio Website",
            summary: "This portfolio, built with modern tooling and clean UI patterns.",
            tech: "Next.js • TypeScript • Tailwind CSS • Neon • Vercel",
        },
        {
            emoji: "🖼️",
            name: "Image Filters Website",
            summary: "A web app that lets users apply filters to images using Pillow.",
            tech: "Python (Flask) • Pillow • HTML5 • CSS3 • JavaScript",
        },
        {
            emoji: "🖌️",
            name: "Shared Paint Canvas",
            summary: "A Pygame canvas that lets people on the same network draw together in real time.",
            tech: "Python (Pygame)",
        },
    ];

    function openProjects(event) {
        event?.stopPropagation();

        const aboutPanel = document.querySelector('.about-me-panel-active') || document.querySelector('.about-me-panel');
        const projectPanel = document.querySelector('.project-panel') || document.querySelector('.project-panel-active');

        if (aboutPanel) aboutPanel.className = 'about-me-panel';
        if (projectPanel) projectPanel.className = 'project-panel-active';
    }
    return (
        <div className="about-me-panel-content" onClick={(e) => e.stopPropagation()}>
            <div className="about-me-panel-header">
                <WindowControls panelName="about-me"/>
            </div>
            <div className="about-me-panel-body">
                <section className="about-hero">
                    <div className="about-copy">
                        <p className="about-eyebrow">Hi there, I am Connor · Auckland, NZ</p>
                        <h2 className="about-title">I am a developer who loves learning, understanding, and building clean, efficient solutions.</h2>
                        <p className="about-lede">I enjoy solving problems hands-on, asking good questions, and iterating with feedback. I’m studying Computer Science at the University of Auckland while building web, backend, and security-flavored side projects.</p>

                        <div className="about-contact">
                            <a href="mailto:connorknoetze@email.com">connorknoetze@email.com</a>
                            <span>·</span>
                            <a href="tel:+64273897568">+64 27 389 7568</a>
                            <span>·</span>
                            <a href="https://www.connorknoetze.com" target="_blank" rel="noreferrer">connorknoetze.com</a>
                            <span>·</span>
                            <a href="https://github.com/ConnorKnoetze" target="_blank" rel="noreferrer">GitHub</a>
                        </div>

                        <div className="about-badges">
                            {["Python", "Java", "TypeScript", "NextJS", "Flask", "SQLAlchemy", "Git", "Linux"]
                                .map((label) => (
                                    <span key={label} className="about-badge">{label}</span>
                                ))}
                        </div>
                    </div>

                    <div className="about-highlight-card">
                        <h3>Personal statement</h3>
                        <ul className="about-list">
                            <li><span className="dot success" />Curious and motivated; I learn best by building and asking thoughtful questions.</li>
                            <li><span className="dot info" />I value clear instructions, clean code, and constructive feedback so I can improve fast.</li>
                            <li><span className="dot neutral" />I’m comfortable picking up new tools; I focus on understanding why things work, not just shipping quickly.</li>
                        </ul>
                    </div>
                </section>

                <section className="about-grid">
                    <div className="about-details-card">
                        <div className="about-card">
                            <div className="about-card-label">Education</div>
                            <h3>BSc Computer Science</h3>
                            <p>University of Auckland (2024–Present). Coursework: Algorithms & Data Structures, Discrete Structures, Computer Architecture, Software Dev Methodologies, Data Communications & Security, OOP, Statistics.</p>
                        </div>
                        <div className="about-card">
                            <div className="about-card-label">Skills & tools</div>
                            <h3>Programming & workflows</h3>
                            <p>Languages: Python, Java, C, SQL, TypeScript. Tools: Git, Linux, VS Code, JetBrains, NextJS, Flask, SQLAlchemy, Jinja, PyGame, Java Swing. Interests: open source, security, systems, DSA.</p>
                        </div>
                    </div>
                    <div className="about-card about-projects-card">
                        <div className="about-card-label">Recent projects</div>
                        <h3>Things I have shipped lately</h3>
                        <ul className="about-projects-list">
                            {favoriteProjects.map(({ emoji, name, summary, tech }) => (
                                <li key={name}>
                                    <div className="about-project-title">
                                        <span className="project-emoji" aria-hidden="true">{emoji}</span>
                                        <span>{name}</span>
                                    </div>
                                    <p className="about-project-summary">{summary}</p>
                                    <p className="about-project-tech">{tech}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="about-project-actions">
                            <button type="button" className="about-cta ghost" onClick={openProjects}>
                                View all projects →
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}