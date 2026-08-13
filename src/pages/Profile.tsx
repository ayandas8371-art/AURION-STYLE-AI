import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Crown, LogOut, ChevronRight, User, Bell, HelpCircle, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Profile.css';

export const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Aurion Guest';
    const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const plans = [
        {
            id: 'premium',
            name: 'Aurion Gold',
            price: '₹499',
            period: '/month',
            features: ['Unlimited Outfits', 'Virtual Try-On Access', 'Priority Processing']
        },
        {
            id: 'platinum',
            name: 'Aurion Platinum',
            price: '₹999',
            period: '/month',
            features: ['Personal Stylist', 'Early Access', 'Concierge Service']
        }
    ];

    return (
        <Layout>
            <div className="profile-page">
                {/* Header */}
                <div className="profile-header">
                    <div className="avatar-container">
                        <div className="avatar-circle">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={displayName} className="avatar-img" />
                            ) : (
                                <span className="text-3xl font-serif">{displayName[0]}</span>
                            )}
                        </div>
                        <div className="avatar-glow"></div>
                    </div>

                    <h2 className="profile-name">{displayName}</h2>
                    <p className="profile-email">{user?.email || 'guest@example.com'}</p>

                    <div className="member-badge">
                        <Crown size={12} fill="currentColor" />
                        <span>Gold Member</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="stats-row">
                    <div className="stat-item">
                        <span className="stat-value">24</span>
                        <span className="stat-label">Closet</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Try-Ons</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">5</span>
                        <span className="stat-label">Reports</span>
                    </div>
                </div>

                {/* Subscription Section - Gold Pill Style */}
                <div className="profile-section">
                    <h3 className="section-title">Your Plan</h3>
                    <div className="plans-carousel">
                        {plans.map(plan => (
                            <div key={plan.id} className="gold-pill-card">
                                <div className="pill-shine"></div>
                                <div className="pill-content">
                                    <h4 className="pill-title">{plan.name}</h4>
                                    <div className="pill-price">
                                        {plan.price}<span className="pill-period">{plan.period}</span>
                                    </div>
                                    <ul className="pill-features">
                                        {plan.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                    <button className="pill-button">Active</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings Section */}
                <div className="profile-section">
                    <h3 className="section-title">Settings</h3>
                    <div className="settings-group">
                        <button className="settings-item">
                            <div className="settings-icon"><User size={20} /></div>
                            <span className="settings-label">Account Information</span>
                            <ChevronRight size={16} className="settings-arrow" />
                        </button>
                        <button className="settings-item">
                            <div className="settings-icon"><Bell size={20} /></div>
                            <span className="settings-label">Notifications</span>
                            <ChevronRight size={16} className="settings-arrow" />
                        </button>
                        <button className="settings-item">
                            <div className="settings-icon"><Shield size={20} /></div>
                            <span className="settings-label">Privacy & Security</span>
                            <ChevronRight size={16} className="settings-arrow" />
                        </button>
                    </div>

                    <h3 className="section-title">Support</h3>
                    <div className="settings-group">
                        <button className="settings-item">
                            <div className="settings-icon"><HelpCircle size={20} /></div>
                            <span className="settings-label">Help Center</span>
                            <ChevronRight size={16} className="settings-arrow" />
                        </button>
                        <button className="settings-item text-red-400" onClick={handleSignOut}>
                            <div className="settings-icon"><LogOut size={20} /></div>
                            <span className="settings-label">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
