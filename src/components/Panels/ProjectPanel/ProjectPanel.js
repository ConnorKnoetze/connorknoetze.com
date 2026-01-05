'use client';

import { useEffect, useState } from "react";
import WindowControls from "../../WindowControls/WindowControls";
import "@/styles/Panels/ProjectPanel/ProjectPanel.css";

export default function ProjectPanel(){
    const blacklistedRepos = ["ConnorKnoetze", "Dart_Board", "Java-OpenGL-Triangle-LWJGL"];
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await fetch('https://api.github.com/users/ConnorKnoetze/repos', {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    },
                });

                if (response.status === 403) {
                    setError("Rate limit exceeded. Please wait until the limit resets.");
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data = await response.json();
                const filteredRepos = data.filter(repo => !blacklistedRepos.includes(repo.name));
                const sortedRepos = filteredRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRepos(sortedRepos);
                setFilteredRepos(sortedRepos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setError(error.message);
                setLoading(false);
            }
        }

        fetchRepos();
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        const filtered = repos.filter(repo => 
            repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRepos(filtered);
    }

    function closeWindow(panelName) {
        const wallpaperPanel = document.querySelector(`.${panelName}-panel-active`);
        wallpaperPanel.className = `${panelName}-panel`;
    }

    function getCurrentWallpaper() {
        const bodyStyles = window.getComputedStyle(document.body);
        const backgroundImage = bodyStyles.getPropertyValue('background-image');
        const match = backgroundImage.match(/wallpapers\/(.*?)"/);
        return match ? match[1] : 'default.jpg';
    }

    return (
        <div className="project-panel-content" onClick={(e) => e.stopPropagation()}>
            <div className="project-panel-header">
                <div className="header-tag-area">
                    <div className="header-left-radius"></div>
                    <div className="header-tag-background">
                        <div className="header-top-radius"></div>
                        <div className="header-tag">
                            <p>💻 Projects</p>
                            <img src="/images/WindowControls/close.png" onClick={() => closeWindow('project')} alt="close" />
                        </div>
                    </div>
                    <div className="header-right-radius"></div>
                </div>
                <WindowControls panelName="project"/>
            </div>

            <div className="project-panel-controls">
                <div className="arrow-image-area invert-50"><img src="/images/arrows/left.png" alt="left arrow" /></div>
                <div className="arrow-image-area invert-50"><img src="/images/arrows/right.png" alt="right arrow" /></div>
                <div className="arrow-image-area"><img src="/images/arrows/up.png" alt="up arrow" /></div>
                <div className="arrow-image-area"><img src="/images/arrows/rotate-right.png" alt="rotate right arrow" /></div>

                <div className="file-path-area">
                    <img src="/images/WindowControls/home.png"/>
                    <div className="file-path-arrow-image-area"><img style={{width: "10px"}} src="/images/arrows/right-arrow.png"/></div>
                    <p>Projects</p>
                </div>

                <form className="search-area" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Search Projects"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
                        <img src="/images/WindowControls/loupe.png" alt="search icon"/>
                    </button>
                </form>
            </div>

            <div className="project-panel-body">
                {loading && <p>Loading projects...</p>}
                {error && <p style={{color: 'red'}}>{error}</p>}
                {!loading && !error && (
                    <div id="repo-grid" className="repo-grid">
                        {filteredRepos.map(repo => (
                            <div key={repo.id} className="repo-item">
                                <button onDoubleClick={() => window.location.href = `/project?name=${repo.name}&w=${getCurrentWallpaper()}`} className="repo-button">
                                    <img src={'/images/icons/filled_folder.png'} alt={`${repo.name}`} />
                                    <p>{repo.name}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}