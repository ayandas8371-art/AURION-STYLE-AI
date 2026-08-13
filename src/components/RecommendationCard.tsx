import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Outfit } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Card } from './Card';
import { Button } from './Button';
import { Sparkles, Palette } from 'lucide-react';
import './RecommendationCard.css';

interface RecommendationCardProps {
    outfit: Outfit;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ outfit }) => {
    const [showRationale, setShowRationale] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="recommendation-block">
            <Card variant="solid" padding="none" className="outfit-card">
                {/* Placeholder for now if no hero image */}
                <div className="outfit-hero">
                    {outfit.heroImage ? (
                        <img src={outfit.heroImage} className="hero-img" />
                    ) : (
                        <div className="hero-placeholder">
                            <span className="text-gold opacity-50 text-6xl">✨</span>
                        </div>
                    )}

                    <div className="outfit-overlay">
                        <div className="outfit-header">
                            <h3 className="outfit-title">{outfit.title}</h3>
                            <p className="outfit-meta">{outfit.products.length} items • Complete Look</p>
                        </div>

                        <div className="outfit-price-badge">
                            <div className="price-col">
                                <span className="total-label">Total Estimate</span>
                                <span className="total-price">₹{outfit.totalPrice.toLocaleString()}</span>
                            </div>
                            {outfit.savings && (
                                <div className="savings-badge">
                                    Save ₹{outfit.savings.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="outfit-actions">
                    <p className="outfit-description">{outfit.description}</p>

                    <div className="flex justify-between items-center mb-4">
                        <button className="rationale-btn" onClick={() => setShowRationale(!showRationale)}>
                            <Sparkles size={14} className="mr-2" />
                            Why this suits you
                        </button>

                        <Button variant="outline" size="sm" onClick={() => navigate('/try-on')}>
                            <Sparkles size={14} className="mr-2" /> Try On
                        </Button>
                    </div>

                    {showRationale && (
                        <div className="ai-rationale fade-in">
                            <p>{outfit.aiRationale}</p>
                            <div className="palette-preview">
                                <Palette size={14} className="text-gold mr-2" />
                                <div className="color-dot" style={{ background: '#6A0F0F' }}></div>
                                <div className="color-dot" style={{ background: '#D4AF37' }}></div>
                                <div className="color-dot" style={{ background: '#1A1A1A' }}></div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Product Scroll */}
            <h4 className="shop-heading">Shop the Look</h4>
            <div className="products-scroll">
                {outfit.products.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};
