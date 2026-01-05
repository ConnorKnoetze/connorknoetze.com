import { Suspense } from 'react';
import DesktopContent from '@/components/DesktopContent/DesktopContent'
import DesktopWithSearchParams from '@/components/DesktopContent/DesktopWithSearchParams';

export default function Desktop(){
    return (
        <Suspense fallback={<DesktopContent />}>
            <DesktopWithSearchParams />
        </Suspense>
    );
}