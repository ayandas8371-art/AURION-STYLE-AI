import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { SettingsPageHeader } from '../components/SettingsPageHeader';
import { Search, ChevronDown } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Settings.css';

interface FaqItem {
    id: string;
    category: string;
    question: string;
    answer: string;
}

// Scoped to features that actually exist in AURION AI today.
const FAQ_ITEMS: FaqItem[] = [
    {
        id: 'getting-started',
        category: 'Getting Started',
        question: 'How do I get started with AURION AI?',
        answer:
            'Sign in, then take the Style Quiz or upload a photo from the Home page. AURION AI uses your answers and photo to build your personal style profile.',
    },
    {
        id: 'style-quiz',
        category: 'Style Quiz',
        question: 'What does the Style Quiz ask for?',
        answer:
            'A few quick questions about your preferences - things like colors, occasions, and style personality - so your recommendations feel like you.',
    },
    {
        id: 'photo-upload',
        category: 'Photo Upload',
        question: 'Is my uploaded photo private?',
        answer:
            'Yes. Photos are stored in a private bucket only your account can access, and they\'re used only to analyze skin tone, body type, and styling recommendations.',
    },
    {
        id: 'ai-styling',
        category: 'AI Styling',
        question: 'How does AURION AI create my recommendations?',
        answer:
            'Your quiz answers and photo analysis are combined into a style profile, which AURION AI uses to generate a personalized Style Report with colors, silhouettes, and outfit guidance.',
    },
    {
        id: 'explore',
        category: 'Explore',
        question: 'What is the Explore page for?',
        answer:
            'Explore is a curated catalog of fashion pieces you can browse by category - use the filter chips (Trending, Luxury, Casual, Formal) to narrow things down.',
    },
    {
        id: 'closet',
        category: 'Closet',
        question: 'How do I save items to my Closet?',
        answer:
            'Tap the heart icon on a product to save it. Your Closet also groups full curated outfits by occasion, which you can filter by category.',
    },
    {
        id: 'reports',
        category: 'Reports',
        question: 'Can I download or share my Style Report?',
        answer:
            'Yes - open Reports and use "Download PDF Report" to save a printable copy, or "Share Profile" to send the link to someone else.',
    },
    {
        id: 'profile',
        category: 'Profile',
        question: 'How do I update my name or email?',
        answer: 'Go to Profile → Account Information to edit your name and email address.',
    },
    {
        id: 'membership',
        category: 'Membership',
        question: 'What\'s the difference between AURION Gold and Platinum?',
        answer:
            'Both are membership tiers shown on your Profile page with their own features and pricing - open Profile to compare them and see what\'s included.',
    },
];

export const HelpCenter: React.FC = () => {
    useDocumentTitle('Help Center');
    const [query, setQuery] = useState('');
    const [openId, setOpenId] = useState<string | null>(null);

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return FAQ_ITEMS;
        return FAQ_ITEMS.filter(
            item =>
                item.question.toLowerCase().includes(q) ||
                item.answer.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <Layout wide>
            <div className="settings-page">
                <SettingsPageHeader title="Help Center" subtitle="How can we help?" />
                <div className="settings-content">
                    <div className="help-search-wrapper">
                        <Search size={16} className="help-search-icon" aria-hidden="true" />
                        <input
                            type="search"
                            className="help-search-input"
                            placeholder="Search help..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            aria-label="Search help topics"
                        />
                    </div>

                    <Card variant="glass" className="settings-card">
                        <h2 className="settings-card-title">Frequently Asked Questions</h2>
                        {filteredItems.length === 0 ? (
                            <p className="help-empty">No results for "{query}". Try a different search.</p>
                        ) : (
                            filteredItems.map(item => {
                                const isOpen = openId === item.id;
                                return (
                                    <div className="help-faq-item" key={item.id}>
                                        <button
                                            type="button"
                                            className="help-faq-question"
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-${item.id}`}
                                            onClick={() => setOpenId(isOpen ? null : item.id)}
                                        >
                                            <span>{item.question}</span>
                                            <ChevronDown size={16} aria-hidden="true" />
                                        </button>
                                        {isOpen && (
                                            <p className="help-faq-answer" id={`faq-answer-${item.id}`}>
                                                {item.answer}
                                            </p>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </Card>
                </div>
            </div>
        </Layout>
    );
};
