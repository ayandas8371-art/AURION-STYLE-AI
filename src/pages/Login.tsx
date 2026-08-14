import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Phone, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured } from '../lib/supabase';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Login.css';

export const Login: React.FC = () => {
    useDocumentTitle('Sign In');
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
                            type="button"
                            className={`auth-tab ${authMethod === 'email' ? 'active' : ''}`}
                            aria-pressed={authMethod === 'email'}
                            onClick={() => { setAuthMethod('email'); setError(''); }}
                        >
                            <Mail size={16} /> Email
                        </button>
                        <button
                            type="button"
                            className={`auth-tab ${authMethod === 'phone' ? 'active' : ''}`}
                            aria-pressed={authMethod === 'phone'}
                            onClick={() => { setAuthMethod('phone'); setError(''); }}
                        >
                            <Phone size={16} /> Phone
                        </button>
                    </div>

                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle mb-6">Sign in to access your luxury wardrobe.</p>

                    <form onSubmit={handleLogin} className="login-form">
                        {authMethod === 'email' ? (
                            <Input
                                label="Email Address"
                                icon={<Mail size={18} />}
                                placeholder="you@example.com"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        ) : (
                            <Input
                                label="Phone Number"
                                icon={<Phone size={18} />}
                                placeholder="+91 98765 43210"
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        )}

                        <Input
                            label="Password"
                            icon={<Lock size={18} />}
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="form-actions">
                            <button type="button" className="forgot-password">Forgot Password?</button>
                        </div>

                        {error && (
                            <p className="login-error" role="alert">
                                <AlertCircle size={14} aria-hidden="true" />
                                {error}
                            </p>
                        )}

                        <Button type="submit" fullWidth isLoading={loading}>
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
