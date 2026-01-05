'use client';

import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProjectWithSearchParams() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const wallpaper = searchParams.get('w');
    const [repo, setRepo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const authHeaders = (() => {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        return token ? { Authorization: `Bearer ${token}` } : {};
    })();

    useEffect(() => {
        fetchRepoDetails();
    }, [name]);

    useEffect(() => {
        if (wallpaper) {
            document.body.style.transition = 'none';
            document.body.style.backgroundImage = `url('/images/wallpapers/${wallpaper}')`;
        }
    }, [wallpaper]);

    async function fetchRepoDetails() {
        try {
            const response = await fetch(`https://api.github.com/repos/ConnorKnoetze/${name}`, {
                headers: authHeaders,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch repository');
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
            <div className="project-page">
                <div className="project-shell">
                    <p className="project-error">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (loading || !repo) {
        return (
            <div className="project-page">
                <div className="project-shell">
                    <p className="project-muted">Loading project…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="project-page">
            <div className="project-shell">
                <header className="project-shell-header">
                    <div>
                        <p className="project-eyebrow">Project detail</p>
                        <h1 className="project-title">{repo.name}</h1>
                        <p className="project-lede">{repo.description || 'No description available'}</p>
                        <div className="project-meta-inline">
                            <span><strong>Language:</strong> {repo.language || 'N/A'}</span>
                            <span><strong>Created:</strong> {new Date(repo.created_at).toLocaleDateString()}</span>
                            <span><strong>Updated:</strong> {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-cta primary">
                        View on GitHub →
                    </a>
                </header>

                <div className='project-shell-body'>
                    <div className='project-card image-card'>
                        <div className="project-card-label">Gallery</div>
                        <ImageCarousel repoName={repo.name}/>
                    </div>

                    {repo.topics && repo.topics.length > 0 && (
                        <div className='project-card topics-card'>
                            <div className="project-card-label">Topics</div>
                            <div className="topic-chips">
                                {repo.topics.map(topic => (
                                    <span key={topic} className="topic-tag">{topic}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
