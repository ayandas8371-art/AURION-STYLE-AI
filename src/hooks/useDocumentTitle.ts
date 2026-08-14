import { useEffect } from 'react';

export function useDocumentTitle(pageTitle: string) {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = pageTitle ? `AURION AI — ${pageTitle}` : 'AURION AI — AI-Powered Fashion Styling';
        return () => {
            document.title = previousTitle;
        };
    }, [pageTitle]);
}
