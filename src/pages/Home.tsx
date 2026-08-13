import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import shoppingTablet from '../assets/shopping-tablet.jpg';
import shoeEditorial from '../assets/shoe-editorial.jpg';
import boutiqueWhite from '../assets/boutique-white.jpg';
import stylistConsult from '../assets/stylist-consult.jpg';
import heroDinner from '../assets/hero-dinner.jpg';
import whiteSuit from '../assets/white-suit.jpg';
import resortElegance from '../assets/resort-elegance.jpg';
import storeInterior from '../assets/store-interior.jpg';
import { Sparkles, ShoppingBag, Palette, Zap, ArrowRight } from 'lucide-react';
import './Home.css';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const handleUploadClick = () => {
        navigate('/style-wizard');
    };

    return (
        <Layout>
            <div className="home-container">
                {/* Hero Section - Split Layout */}
                <section className="hero-section">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="hero-badge">
                                <span>AI-Powered Fashion Styling</span>
                            </div>
                            <h1 className="hero-title">Discover Your <br /><span className="text-gradient-gold">Perfect Style</span></h1>

                            {/* New Info Card combining Image and Text */}
                            <div className="hero-info-card">
                                <div className="info-card-img">
                                    <img src={whiteSuit} alt="Personalized Styling" />
                                </div>
                                <p className="hero-description">
                                    Upload your photo, tell us the occasion, and let AI curate personalized outfits that match your skin tone, body type, and budget.
                                </p>
                            </div>

                            <div className="hero-actions">
                                <Button variant="primary" size="lg">
                                    Take Style Quiz
                                </Button>

                                <Button variant="secondary" size="lg" onClick={handleUploadClick}>
                                    Upload Photo <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                            <div className="hero-social-proof">
                                <div className="stars">★★★★★</div>
                                <span>10k+ Happy Users</span>
                                <span className="divider-dot">•</span>
                                <span>50+ Partner Stores</span>
                            </div>
                        </div>
                        {/* Removed separate image container */}
                    </div>
                </section>

                {/* Feature Grid - How LuxFit Works */}
                <section className="section-container">
                    <h2 className="section-title text-center mb-8"><span style={{ color: '#FFFFFF' }}>How</span> <span className="text-gold">Aurion AI</span> <span style={{ color: '#FFFFFF' }}>Works</span></h2>
                    <div className="feature-grid">
                        <Card variant="glass" padding="none" className="feature-card">
                            <div className="feature-img-wrapper">
                                <img src={stylistConsult} alt="AI Styling" />
                            </div>
                            <div className="feature-content">
                                <div className="feature-icon"><Sparkles size={20} strokeWidth={1} /></div>
                                <h3>AI-Powered Styling</h3>
                                <p>Our AI analyzes your features to recommend perfect color palettes.</p>
                            </div>
                        </Card>
                        <Card variant="glass" padding="none" className="feature-card">
                            <div className="feature-img-wrapper">
                                <img src={shoppingTablet} alt="Price Comparison" />
                            </div>
                            <div className="feature-content">
                                <div className="feature-icon"><ShoppingBag size={20} strokeWidth={1} /></div>
                                <h3>Price Comparison</h3>
                                <p>Find the best deals across Amazon, Myntra, Ajio, and more.</p>
                            </div>
                        </Card>
                        <Card variant="glass" padding="none" className="feature-card">
                            <div className="feature-img-wrapper">
                                <img src={resortElegance} alt="Skin Tone Matching" />
                            </div>
                            <div className="feature-content">
                                <div className="feature-icon"><Palette size={20} strokeWidth={1} /></div>
                                <h3>Skin Tone Matching</h3>
                                <p>Outfits curated to complement your unique complexion.</p>
                            </div>
                        </Card>
                        <Card variant="glass" padding="none" className="feature-card">
                            <div className="feature-img-wrapper">
                                <img src={boutiqueWhite} alt="Instant Results" />
                            </div>
                            <div className="feature-content">
                                <div className="feature-icon"><Zap size={20} strokeWidth={1} /></div>
                                <h3>Instant Results</h3>
                                <p>Get complete outfit recommendations in seconds.</p>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Trending Styles */}
                <section className="section-container">
                    <div className="section-header-row mb-2">
                        <h2 className="section-title mb-0" style={{ color: '#FFFFFF' }}>Trending Styles Today</h2>
                        <div className="badge-pill">Updated Daily</div>
                    </div>
                    <p className="section-subtitle mb-6">Curated picks that India is loving right now.</p>

                    <div className="product-grid">
                        {/* Product 1 */}
                        <div className="product-card">
                            <div className="product-image-wrapper">
                                <img src={boutiqueWhite} alt="Oversized Blazer" />
                                <span className="discount-badge">33% OFF</span>
                                <button className="wishlist-btn"><span className="heart-icon">♡</span></button>
                            </div>
                            <div className="product-details">
                                <span className="brand-name">Zara</span>
                                <h4>Oversized Blazer</h4>
                                <div className="price-row">
                                    <span className="current-price">₹3,999</span>
                                    <span className="original-price">₹5,999</span>
                                </div>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="product-card">
                            <div className="product-image-wrapper">
                                <img src={shoeEditorial} alt="Nike Mesh Sneakers" />
                                <span className="discount-badge">20% OFF</span>
                                <button className="wishlist-btn"><span className="heart-icon">♡</span></button>
                            </div>
                            <div className="product-details">
                                <span className="brand-name">Nike</span>
                                <h4>Mesh Sneakers</h4>
                                <div className="price-row">
                                    <span className="current-price">₹5,999</span>
                                    <span className="original-price">₹8,999</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curated Inspiration */}
                <section className="section-container">
                    <h2 className="section-title text-center mb-2"><span style={{ color: '#FFFFFF' }}>Curated</span> <span className="text-gold">Fashion Inspiration</span></h2>
                    <p className="section-subtitle text-center mb-8">Explore premium styles handpicked by our AI.</p>

                    <div className="inspiration-grid">
                        <div className="inspire-item tall">
                            <img src={storeInterior} alt="Luxury Store" />
                            <div className="inspire-overlay">
                                <span>Boutique Collections</span>
                            </div>
                        </div>
                        <div className="inspire-item">
                            <img src={resortElegance} alt="Resort Style" />
                            <div className="inspire-overlay">
                                <span>Resort Elegance</span>
                            </div>
                        </div>
                        <div className="inspire-item">
                            <img src={heroDinner} alt="Evening Wear" />
                            <div className="inspire-overlay">
                                <span>Evening Gowns</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Footer */}
                <section className="cta-section">
                    <Card variant="glass" className="cta-card text-center">
                        <h2 className="text-2xl font-serif mb-4">Ready to Transform Your Style?</h2>
                        <p className="text-gray-400 mb-6">Join thousands of fashion-forward individuals who've discovered their perfect look.</p>
                        <Button variant="primary" fullWidth className="max-w-xs mx-auto">
                            Get Your Personalized Outfits
                        </Button>
                    </Card>
                </section>
            </div>
        </Layout>
    );
};
