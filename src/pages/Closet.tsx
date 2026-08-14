import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { MOCK_FEED } from '../data/mockData';
import type { Outfit } from '../data/mockData';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import storeInterior from '../assets/store-interior.jpg';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Closet.css';

// Each MOCK_FEED section maps to one filter chip. "Casual" has no
// dedicated section in the mock data - Resort & Travel (loungewear,
// relaxed fits) is the closest existing thematic fit, so it's grouped
// there rather than leaving the chip permanently empty or inventing a
// new mock outfit.
const SECTION_TO_FILTER: Record<string, string> = {
    'sec-wedding': 'Wedding',
    'sec-office': 'Office',
    'sec-party': 'Party',
    'sec-resort': 'Casual',
};

export const Closet: React.FC = () => {
    useDocumentTitle('Your Closet');

    const categorizedOutfits = useMemo(
        () =>
            MOCK_FEED
                .filter(s => s.type === 'outfits')
                .flatMap(section =>
                    (section.content as Outfit[]).map(outfit => ({
                        ...outfit,
                        category: SECTION_TO_FILTER[section.id] ?? 'Other',
                    }))
                ),
        []
    );

    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Wedding', 'Office', 'Casual', 'Party'];

    // These outfits come from static mock data (not a saved_outfits query),
    // so "removing" one has nothing real to delete server-side - it hides
    // the card from this session's view, which is the honest behavior for
    // a dataset that was never actually saved by the user in the first place.
    const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

    const visibleOutfits = categorizedOutfits.filter(
        o => !removedIds.has(o.id) && (activeFilter === 'All' || o.category === activeFilter)
    );

    const handleRemove = (id: string, title: string) => {
        setRemovedIds(prev => new Set(prev).add(id));
        toast.success(`Removed "${title}" from your closet`);
    };

    return (
        <Layout wide>
            <div className="closet-page">
                <div
                    className="closet-hero"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), #0a0a0a), url(${storeInterior})`,
                    }}
                >
                    <div>
                        <h1 className="text-3xl font-serif text-white">Your Virtual Closet</h1>
                        <p className="text-gray-300 text-sm">Curated by AURION AI</p>
                    </div>
                </div>

                <div className="filter-scroll mb-6">
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="closet-grid">
                    {visibleOutfits.length === 0 ? (
                        <p className="closet-empty">No items in this category yet.</p>
                    ) : (
                        <>
                            {visibleOutfits.map(outfit => (
                                <Card key={outfit.id} variant="solid" padding="none" className="closet-item">
                                    <div className="item-image">
                                        {outfit.heroImage ? (
                                            <img src={outfit.heroImage} />
                                        ) : (
                                            <div className="placeholder-art">✨</div>
                                        )}
                                        <button
                                            className="delete-btn"
                                            aria-label={`Remove ${outfit.title} from closet`}
                                            onClick={() => handleRemove(outfit.id, outfit.title)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <div className="item-details">
                                        <h4 className="item-title">{outfit.title}</h4>
                                        <p className="item-meta">{outfit.products.length} Items</p>
                                    </div>
                                </Card>
                            ))}
                            {/* Duplicate cards for mobile visual fullness only - hidden on
                                desktop (.closet-item-duplicate, see Closet.css) since a
                                premium wardrobe grid shouldn't pad itself out with fake
                                placeholder data; the real outfits above are enough at
                                desktop widths. Left in place so the mobile grid density
                                that's already approved is untouched. Mirrors the same
                                filtered set so mobile filtering stays consistent too. */}
                            {visibleOutfits.map(outfit => (
                                <Card key={`${outfit.id}-dup`} variant="solid" padding="none" className="closet-item closet-item-duplicate">
                                    <div className="item-image">
                                        <div className="placeholder-art" style={{ background: '#1A1A1A' }}>👔</div>
                                        <button
                                            className="delete-btn"
                                            aria-label={`Remove ${outfit.title} from closet`}
                                            onClick={() => handleRemove(outfit.id, outfit.title)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <div className="item-details">
                                        <h4 className="item-title">{outfit.title}</h4>
                                        <p className="item-meta">{outfit.products.length} Items</p>
                                    </div>
                                </Card>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};
