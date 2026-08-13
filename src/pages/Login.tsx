import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured } from '../lib/supabase';
import './Login.css';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { signIn, signInWithGoogle } = useAuth();
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (authMethod === 'email' && !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        if (authMethod === 'phone') {
            setError('Phone sign-in is not available yet. Please use email.');
            return;
        }
        if (!password) {
            setError('Please enter your password');
            return;
        }

        if (!isSupabaseConfigured()) {
            setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
            return;
        }

        setLoading(true);
        const { error: signInError } = await signIn(email, password);
        setLoading(false);

        if (signInError) {
            setError(signInError.message || 'Invalid email or password.');
            return;
        }

        navigate('/home');
    };

    const handleGoogleLogin = async () => {
        setError('');

        if (!isSupabaseConfigured()) {
            setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
            return;
        }

        setLoading(true);
        const { error: googleError } = await signInWithGoogle();
        setLoading(false);

        if (googleError) {
            console.error(googleError);
            setError('Google Sign In failed. Please try again.');
        }
        // On success, Supabase redirects to the OAuth provider; navigation happens on return.
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
