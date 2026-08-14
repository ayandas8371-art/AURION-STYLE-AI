import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { SettingsPageHeader } from '../components/SettingsPageHeader';
import { User, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Settings.css';

export const AccountInformation: React.FC = () => {
    useDocumentTitle('Account Information');
    const { user } = useAuth();

    const [fullName, setFullName] = useState(user?.user_metadata?.full_name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [saving, setSaving] = useState(false);

    const originalName = user?.user_metadata?.full_name ?? '';
    const originalEmail = user?.email ?? '';
    const isDirty = fullName.trim() !== originalName || email.trim() !== originalEmail;

    const validate = () => {
        let valid = true;
        setNameError('');
        setEmailError('');

        if (!fullName.trim()) {
            setNameError('Full name cannot be empty.');
            valid = false;
        } else if (fullName.trim().length > 80) {
            setNameError('Full name is too long.');
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailPattern.test(email.trim())) {
            setEmailError('Enter a valid email address.');
            valid = false;
        }

        return valid;
    };

    const handleSave = async () => {
        if (!user || saving) return;
        if (!validate()) return;

        setSaving(true);
        try {
            const nameChanged = fullName.trim() !== originalName;
            const emailChanged = email.trim() !== originalEmail;

            if (nameChanged) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({ full_name: fullName.trim() })
                    .eq('id', user.id);
                if (profileError) throw profileError;

                const { error: metaError } = await supabase.auth.updateUser({
                    data: { full_name: fullName.trim() },
                });
                if (metaError) throw metaError;
            }

            if (emailChanged) {
                const { error: emailErr } = await supabase.auth.updateUser({ email: email.trim() });
                if (emailErr) throw emailErr;
                toast.success('Confirmation link sent to your new email address');
            }

            if (nameChanged && !emailChanged) {
                toast.success('Profile updated');
            } else if (nameChanged && emailChanged) {
                toast.success('Name updated. Confirm your new email to finish the change.');
            } else if (!nameChanged && !emailChanged) {
                toast.info('No changes to save');
            }
        } catch (err) {
            console.error('Failed to update account information:', err);
            const message = err instanceof Error ? err.message : 'Please try again.';
            toast.error(`Could not save changes: ${message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Layout wide>
            <div className="settings-page">
                <SettingsPageHeader
                    title="Account Information"
                    subtitle="Manage your personal information"
                />
                <div className="settings-content">
                    <Card variant="glass" className="settings-card">
                        <h2 className="settings-card-title">Personal information</h2>
                        <p className="settings-card-desc">
                            This is the name and email associated with your AURION AI account.
                        </p>
                        <div className="settings-field-group">
                            <div>
                                <Input
                                    label="Full name"
                                    icon={<User size={16} />}
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    maxLength={80}
                                    disabled={saving}
                                />
                                {nameError && <span className="settings-form-error">{nameError}</span>}
                            </div>
                            <div>
                                <Input
                                    label="Email address"
                                    icon={<Mail size={16} />}
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={saving}
                                />
                                {emailError && <span className="settings-form-error">{emailError}</span>}
                            </div>
                        </div>
                        <div className="settings-save-row">
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                isLoading={saving}
                                disabled={!isDirty}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};
