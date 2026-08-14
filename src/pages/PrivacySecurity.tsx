import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { SettingsPageHeader } from '../components/SettingsPageHeader';
import { Lock, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Settings.css';

export const PrivacySecurity: React.FC = () => {
    useDocumentTitle('Privacy & Security');
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);

    const handleChangePassword = async () => {
        if (changingPassword) return;
        setPasswordError('');

        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        setChangingPassword(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            toast.success('Password updated');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Please try again.';
            setPasswordError(message);
        } finally {
            setChangingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleting || deleteConfirmText !== 'DELETE') return;
        setDeleting(true);
        try {
            const { error } = await supabase.functions.invoke('delete-account');
            if (error) throw error;
            toast.success('Account deleted');
            await signOut();
            navigate('/login');
        } catch (err) {
            console.error('Failed to delete account:', err);
            toast.error('Could not delete your account. Please try again.');
            setDeleting(false);
        }
    };

    return (
        <Layout wide>
            <div className="settings-page">
                <SettingsPageHeader title="Privacy & Security" subtitle="Your privacy and account security" />
                <div className="settings-content">
                    <Card variant="glass" className="settings-card">
                        <h2 className="settings-card-title">What AURION AI stores</h2>
                        <p className="settings-card-desc">
                            A summary of the data your account holds, in plain language.
                        </p>
                        <ul className="settings-info-list">
                            <li>Your name and email address, used for sign-in and to personalize the app.</li>
                            <li>Any photo you upload for style analysis, stored privately and only accessible to your account.</li>
                            <li>Your AI-generated style profile and reports (skin tone, body type, color palette, and recommendations).</li>
                            <li>Items and outfits you save to your Closet.</li>
                            <li>Your notification preferences.</li>
                        </ul>
                    </Card>

                    <Card variant="glass" className="settings-card">
                        <h2 className="settings-card-title">Account</h2>
                        <p className="settings-card-desc">Signed in as {user?.email}</p>
                        <ul className="settings-info-list">
                            <li>Sign out of AURION AI on this device from your Profile page at any time.</li>
                        </ul>
                    </Card>

                    <Card variant="glass" className="settings-card">
                        <h2 className="settings-card-title">Change password</h2>
                        <p className="settings-card-desc">
                            Choose a new password for your account. You'll stay signed in on this device.
                        </p>
                        <div className="settings-field-group">
                            <Input
                                label="New password"
                                icon={<Lock size={16} />}
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                disabled={changingPassword}
                                autoComplete="new-password"
                            />
                            <Input
                                label="Confirm new password"
                                icon={<Lock size={16} />}
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                disabled={changingPassword}
                                autoComplete="new-password"
                            />
                        </div>
                        {passwordError && <span className="settings-form-error">{passwordError}</span>}
                        <div className="settings-save-row">
                            <Button variant="primary" onClick={handleChangePassword} isLoading={changingPassword}>
                                Update Password
                            </Button>
                        </div>
                    </Card>

                    <Card variant="glass" className="settings-card settings-danger-card">
                        <h2 className="settings-card-title">Delete account</h2>
                        <p className="settings-card-desc">
                            This permanently deletes your AURION AI account and all associated data.
                            This cannot be undone.
                        </p>
                        {!showDeleteConfirm ? (
                            <Button variant="outline" onClick={() => setShowDeleteConfirm(true)}>
                                <AlertTriangle size={16} style={{ marginRight: 8 }} />
                                Delete My Account
                            </Button>
                        ) : (
                            <div className="settings-field-group">
                                <p className="settings-form-error" style={{ marginTop: 0 }}>
                                    Type DELETE to confirm. This action is irreversible.
                                </p>
                                <Input
                                    value={deleteConfirmText}
                                    onChange={e => setDeleteConfirmText(e.target.value)}
                                    placeholder="DELETE"
                                    disabled={deleting}
                                />
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowDeleteConfirm(false);
                                            setDeleteConfirmText('');
                                        }}
                                        disabled={deleting}
                                    >
                                        <X size={16} style={{ marginRight: 8 }} />
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleDeleteAccount}
                                        isLoading={deleting}
                                        disabled={deleteConfirmText !== 'DELETE'}
                                    >
                                        Permanently Delete
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </Layout>
    );
};
