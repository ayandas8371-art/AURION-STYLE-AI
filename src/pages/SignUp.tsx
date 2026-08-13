import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Phone, User, Lock, ArrowRight } from 'lucide-react';
import { auth, googleProvider, isConfigured } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!name.trim()) return "Full Name is required";

        if (authMethod === 'email') {
            if (!email.includes('@')) return "Please enter a valid email address";
        } else {
            if (phone.length < 10) return "Please enter a valid phone number";
        }

        if (password.length < 6) return "Password must be at least 6 characters";
        if (password !== confirmPassword) return "Passwords do not match";

        return null;
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        // Simulate API call for now (since we don't have email/phone auth backend setup yet)
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
                    <p className="brand-tagline">Join the future of fashion</p>
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

                    <h2 className="login-title">Create Account</h2>
                    <p className="login-subtitle mb-6">Start your personalized style journey.</p>

                    <form onSubmit={handleSignUp} className="login-form">
                        <div className="input-with-icon relative">
                            <User size={18} className="absolute left-3 top-3 text-gray-400" />
                            <Input
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {authMethod === 'email' ? (
                            <div className="input-with-icon relative mt-4">
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
                            <div className="input-with-icon relative mt-4">
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

                        <div className="input-with-icon relative mt-4">
                            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}

                        <Button type="submit" fullWidth isLoading={loading} className="mt-6">
                            Create Account <ArrowRight size={16} className="ml-2" />
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
                            Sign up with Google
                        </Button>
                    </form>
                </Card>

                <div className="login-footer">
                    <p>Already have an account? <span className="text-gold cursor-pointer" onClick={() => navigate('/login')}>Sign In</span></p>
                </div>
            </div>
        </Layout>
    );
};
