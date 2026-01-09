'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import WindowControls from "../../WindowControls/WindowControls";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import "@/styles/Panels/PerProjectPanel/PerProjectPanel.css";

export default function PerProjectPanel({ name }) {
    const [repo, setRepo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const authHeaders = (() => {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        return token ? { Authorization: `Bearer ${token}` } : {};
    })();

    useEffect(() => {
        if (name)
        fetchRepoDetails();
    }, [name]);

    async function fetchRepoDetails() {
        try {
            const response = await fetch(`https://api.github.com/repos/ConnorKnoetze/${name}`, {
                headers: authHeaders,
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            setRepo(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching repo:', error);
            setError(error.message);
            setLoading(false);
        }
    }

    if (error) {
        return (
            <article
                className="per-project-panel-content"
                onClick={(e) => e.stopPropagation()}
                role="region"
                aria-labelledby="per-project-title"
            >
                <div className="per-project-panel-header">
                    <WindowControls panelName="project"/>
                </div>
                <p className="per-project-error">Error: {error}</p>
            </article>
        );
    }

    if (loading || !repo) {
        return (
            <article
                className="per-project-panel-content"
                onClick={(e) => e.stopPropagation()}
                role="region"
                aria-labelledby="per-project-title"
            >
                <div className="per-project-panel-header">
                    <WindowControls panelName="per-project"/>
                </div>
                <p className="per-project-muted">Loading project…</p>
            </article>
        );
    }
    return (
        <article
            className="per-project-panel-content mb-3"
            onClick={(e) => e.stopPropagation()}
            role="region"
            aria-labelledby="per-project-title"
        >
            <div className="per-project-panel-header">
                <WindowControls panelName="per-project"/>
            </div>
            <section className="per-project-panel-body" aria-label="Project details">
                <header className="per-project-header">
                    <div className="per-project-header-content">
                        <p className="per-project-eyebrow">Project</p>
                        <h1 id="per-project-title" className="per-project-title">{repo.name}</h1>
                        <p className="per-project-description">{repo.description || 'No description available'}</p>
                        <div className="per-project-meta">
                            <span><strong>Language:</strong> {repo.language || 'N/A'}</span>
                            <span><strong>Stars:</strong> {repo.stargazers_count}</span>
                            <span><strong>Forks:</strong> {repo.forks_count}</span>
                        </div>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="per-project-cta">
                        View on GitHub →
                    </a>
                </header>

                <div className="per-project-card image-card">
                    <div className="per-project-card-label">Gallery</div>
                    <ImageCarousel repoName={repo.name}/>
                </div>
                
                <div className="per-project-body-stats">
                    
                    {repo.topics && repo.topics.length > 0 && (
                        <div className="per-project-card topics-card">
                            <div className="per-project-card-label">Topics</div>
                            <div className="per-project-topic-chips">
                                {repo.topics.map(topic => (
                                    <span key={topic} className="per-project-topic-tag">{topic}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="per-project-card stats-card">
                        <div className="per-project-card-label">Repository Info</div>
                        <div className="per-project-stats">
                            <div className="per-project-stat">
                                <span className="per-project-stat-label">Created</span>
                                <span className="per-project-stat-value">{new Date(repo.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="per-project-stat">
                                <span className="per-project-stat-label">Updated</span>
                                <span className="per-project-stat-value">{new Date(repo.updated_at).toLocaleDateString()}</span>
                            </div>
                            <div className="per-project-stat">
                                <span className="per-project-stat-label">Issues</span>
                                <span className="per-project-stat-value">{repo.open_issues_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
