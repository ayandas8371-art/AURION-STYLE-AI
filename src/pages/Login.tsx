import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Phone, Lock } from 'lucide-react';
import { auth, googleProvider, isConfigured } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (authMethod === 'email' && !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        if (authMethod === 'phone' && phone.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        if (!password) {
            setError('Please enter your password');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/home');
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        setError('');

        if (!isConfigured()) {
            setError('Firebase is not configured. Please add your keys to src/lib/firebase.ts');
            return;
        }

        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/home');
        } catch (err: any) {
            console.error(err);
            setError('Google Sign In failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showNav={false}>
            <div className="login-page">
                <div className="login-header">
                    <h1 className="brand-logo text-gradient-gold">AURION AI</h1>
                    <p className="brand-tagline">Your personal style concierge</p>
                </div>

                <Card variant="glass" className="login-form-card" padding="lg">
                    <div className="auth-tabs mb-6">
                        <button
                            className={`auth-tab ${authMethod === 'email' ? 'active' : ''}`}
                            onClick={() => { setAuthMethod('email'); setError(''); }}
                        >
                            <Mail size={16} className="mr-2" /> Email
                        </button>
                        <button
                            className={`auth-tab ${authMethod === 'phone' ? 'active' : ''}`}
                            onClick={() => { setAuthMethod('phone'); setError(''); }}
                        >
                            <Phone size={16} className="mr-2" /> Phone
                        </button>
                    </div>

                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to access your luxury wardrobe.</p>

                    <form onSubmit={handleLogin} className="login-form">
                        {authMethod === 'email' ? (
                            <div className="input-with-icon relative">
                                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                                <Input
                                    placeholder="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        ) : (
                            <div className="input-with-icon relative">
                                <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                                <Input
                                    placeholder="Phone Number"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        )}

                        <div className="input-with-icon relative mt-4">
                            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}

                        <div className="form-actions">
                            <span className="forgot-password">Forgot Password?</span>
                        </div>

                        <Button type="submit" fullWidth isLoading={loading} className="mt-4">
                            Sign In
                        </Button>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <Button
                            variant="secondary"
                            fullWidth
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            Continue with Google
                        </Button>
                    </form>
                </Card>

                <div className="login-footer">
                    <p>Don't have an account? <span className="text-gold cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></p>
                </div>
            </div>
        </Layout>
    );
};
