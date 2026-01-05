import { Suspense } from 'react';
import ProjectWithSearchParams from '@/components/ProjectPage/ProjectWithSearchParams';
import '@/styles/ProjectPage/ProjectPage.css';

function ProjectLoading() {
    return (
        <div className="project-page">
            <div className="project-shell">
                <p className="project-muted">Loading project…</p>
            </div>
        </div>
    );
}

export default function Project() {
    return (
        <Suspense fallback={<ProjectLoading />}>
            <ProjectWithSearchParams />
        </Suspense>
    );
}
