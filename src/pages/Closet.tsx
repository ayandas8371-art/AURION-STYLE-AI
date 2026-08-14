import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { MOCK_FEED } from '../data/mockData';
import type { Outfit } from '../data/mockData';
import { Trash2 } from 'lucide-react';
import storeInterior from '../assets/store-interior.jpg';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Closet.css';

export const Closet: React.FC = () => {
    useDocumentTitle('Your Closet');
    // Flatten mock data for the closet view
    const allOutfits = MOCK_FEED
        .filter(s => s.type === 'outfits')
        .flatMap(s => s.content as Outfit[]);

    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Wedding', 'Office', 'Casual', 'Party'];

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
                    {allOutfits.map(outfit => (
                        <Card key={outfit.id} variant="solid" padding="none" className="closet-item">
                            <div className="item-image">
                                {outfit.heroImage ? (
                                    <img src={outfit.heroImage} />
                                ) : (
                                    <div className="placeholder-art">✨</div>
                                )}
                                <button className="delete-btn">
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
                        placeholder data; the 4 real outfits above are enough at
                        desktop widths. Left in place so the mobile grid density
                        that's already approved is untouched. */}
                    {allOutfits.map(outfit => (
                        <Card key={`${outfit.id}-dup`} variant="solid" padding="none" className="closet-item closet-item-duplicate">
                            <div className="item-image">
                                <div className="placeholder-art" style={{ background: '#1A1A1A' }}>👔</div>
                                <button className="delete-btn">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div className="item-details">
                                <h4 className="item-title">{outfit.title}</h4>
                                <p className="item-meta">{outfit.products.length} Items</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
