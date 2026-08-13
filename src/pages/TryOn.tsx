import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ArrowLeft, Save, Share2, Sparkles, Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import heroDinner from '../assets/hero-dinner.jpg';
import whiteSuit from '../assets/white-suit.jpg';
import './TryOn.css';

export const TryOn: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPremium] = useState(true); // Toggle to test
    const [sliderValue, setSliderValue] = useState(50);

    // Mock Images
    const userImage = location.state?.uploadedImage || heroDinner; // Using the premium user photo
    const aiImage = whiteSuit; // Wearing the white suit
    // Ideally AI image should be the user face on the dress. I'll use a generic fashion image for visual mock.

    if (!isPremium) {
        return (
            <Layout showNav={false}>
                <div className="premium-lock-screen">
                    <div className="lock-content">
                        <div className="lock-icon-circle">
                            <Lock size={40} className="text-gold" />
                        </div>
                        <h1>Unlock Virtual Try-On</h1>
                        <p>See yourself in any outfit instantly with our advanced AI technology.</p>

                        <div className="benefits-list">
                            <div className="benefit-item">✨ Real-time visualization</div>
                            <div className="benefit-item">✨ Unlimited generations</div>
                            <div className="benefit-item">✨ High-resolution downloads</div>
                        </div>

                        <Button fullWidth className="btn-shine">Upgrade to Premium - ₹499/mo</Button>
                        <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">Maybe Later</Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout showNav={false}>
            <div className="try-on-page">
                <div className="try-on-header">
                    <button onClick={() => navigate(-1)} className="back-btn">
                        <ArrowLeft size={24} />
                    </button>
                    <h2>Virtual Fitting Room</h2>
                    <div className="w-8"></div>
                </div>

                <div className="comparison-container">
                    <div className="compare-image-wrapper">
                        {/* This would be a proper slider in a real app, simplified here */}
                        <div
                            className="img-layer user-layer"
                            style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                        >
                            <img src={userImage} alt="You" />
                            <span className="chk-label">Original</span>
                        </div>
                        <div
                            className="img-layer ai-layer"
                        >
                            <img src={aiImage} alt="Try On" />
                            <span className="chk-label right">Aurion AI</span>
                        </div>

                        {/* Slider Control */}
                        <input
                            type="range"
                            min="0" max="100"
                            value={sliderValue}
                            onChange={(e) => setSliderValue(parseInt(e.target.value))}
                            className="compare-slider"
                        />
                        <div className="slider-line" style={{ left: `${sliderValue}%` }}>
                            <div className="slider-thumb">
                                <Sparkles size={12} color="black" fill="black" />
                            </div>
                        </div>
                    </div>
                    <p className="hint">Drag to compare</p>
                </div>

                <div className="try-on-actions">
                    <div className="action-row">
                        <Button variant="secondary" fullWidth leftIcon={<Share2 size={18} />} className="mr-2">Share</Button>
                        <Button variant="primary" fullWidth leftIcon={<Save size={18} />}>Save to Closet</Button>
                    </div>
                    <Button variant="ghost" fullWidth className="mt-4">Try Another Look</Button>
                </div>
            </div>
        </Layout>
    );
};
