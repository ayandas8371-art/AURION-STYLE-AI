import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Sparkles } from 'lucide-react';
import heroDinner from '../assets/hero-dinner.jpg';
import boutiqueWhite from '../assets/boutique-white.jpg';
import shoeEditorial from '../assets/shoe-editorial.jpg';
import resortElegance from '../assets/resort-elegance.jpg';
import whiteSuit from '../assets/white-suit.jpg';
import storeInterior from '../assets/store-interior.jpg';
import shoppingTablet from '../assets/shopping-tablet.jpg';
import exploreSparkleBg from '../assets/explore-sparkle-bg.jpg';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Explore.css';

// Mock Data
const CATEGORIES = ['All', 'Trending', 'Luxury', 'Casual', 'Formal'];

const EXPLORE_ITEMS = [
    {
        id: 1,
        image: whiteSuit,
        title: "The Power Suit",
        brand: "Armani",
        price: "₹125,000",
        category: "Formal"
    },
    {
        id: 2,
        image: shoeEditorial,
        title: "Velvet Runners",
        brand: "Gucci",
        price: "₹65,000",
        category: "Casual"
    },
    {
        id: 3,
        image: heroDinner,
        title: "Evening Silk",
        brand: "Prada",
        price: "₹180,000",
        category: "Luxury"
    },
    {
        id: 4,
        image: resortElegance,
        title: "Resort Linen",
        brand: "Ralph Lauren",
        price: "₹45,000",
        category: "Trending"
    },
    {
        id: 5,
        image: boutiqueWhite,
        title: "Summer Blazer",
        brand: "Zara Premium",
        price: "₹8,990",
        category: "Casual"
    },
    {
        id: 6,
        image: storeInterior,
        title: "Atelier Visit",
        brand: "Experience",
        price: "Book Now",
        category: "Luxury"
    },
    {
        id: 7,
        image: shoppingTablet,
        title: "Digital Stylist",
        brand: "Service",
        price: "₹2,999/mo",
        category: "Trending"
    }
];

export const Explore: React.FC = () => {
    useDocumentTitle('Explore');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = activeCategory === 'All'
        ? EXPLORE_ITEMS
        : EXPLORE_ITEMS.filter(item => item.category === activeCategory);

    return (
        <Layout wide>
            <div className="explore-page">
                {/* Hero Section */}
                {/* Hero Section */}
                <div className="explore-hero">
                    <img src={exploreSparkleBg} alt="" className="explore-hero-bg" />
                    <div className="explore-hero-content">
                        <div className="flex justify-center mb-4">
                            <Sparkles size={24} className="text-gold animate-pulse" />
                        </div>
                        <h1>Curated Collections</h1>
                        <p>Discover handpicked styles from the world's finest fashion houses, tailored to your unique taste.</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="category-filters">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="explore-grid">
                    {filteredItems.map(item => (
                        <div key={item.id} className="explore-card">
                            <div className="explore-img-container">
                                <img src={item.image} alt={item.title} />
                                <div className="explore-overlay">
                                    <div className="explore-actions">
                                        <button className="explore-action-btn">Shop Now</button>
                                        <button className="explore-action-btn secondary">View</button>
                                    </div>
                                </div>
                            </div>
                            <div className="explore-details">
                                <span className="explore-brand">{item.brand}</span>
                                <h3 className="explore-title">{item.title}</h3>
                                <p className="explore-price">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
