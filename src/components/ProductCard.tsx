import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import type { Product } from '../data/mockData';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <span className="brand-badge">{product.brand}</span>
                {product.originalPrice && (
                    <span className="discount-badge">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                )}
            </div>

            <div className="product-details">
                <div className="flex justify-between items-start">
                    <h4 className="product-name">{product.name}</h4>
                    <div className="rating-badge">
                        <Star size={10} fill="currentColor" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <div className="product-footer">
                    <div className="price-info">
                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <button className="shop-btn">
                        Shop <ExternalLink size={12} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};
