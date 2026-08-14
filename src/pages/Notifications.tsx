import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { SettingsPageHeader } from '../components/SettingsPageHeader';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Settings.css';

interface NotificationPreferences {
    styling_recommendations: boolean;
    report_updates: boolean;
    product_offers: boolean;
    account_security: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
    styling_recommendations: true,
    report_updates: true,
    product_offers: false,
    account_security: true,
};

const PREFERENCE_ITEMS: { key: keyof NotificationPreferences; label: string; description: string }[] = [
    {
        key: 'styling_recommendations',
        label: 'Styling recommendations',
        description: 'When AURION AI generates new outfit or style suggestions for you.',
    },
    {
        key: 'report_updates',
        label: 'Style report updates',
        description: 'When a new or updated Style Report is ready in Reports.',
    },
    {
        key: 'product_offers',
        label: 'Product & offer updates',
        description: 'Price drops and new arrivals for items similar to your saved closet.',
    },
    {
        key: 'account_security',
        label: 'Account & security alerts',
        description: 'Sign-in and account changes on your AURION AI account.',
    },
];

export const Notifications: React.FC = () => {
    useDocumentTitle('Notification Preferences');
    const { user } = useAuth();
    const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        if (!user) return;

        supabase
            .from('profiles')
            .select('notification_preferences')
            .eq('id', user.id)
            .single()
            .then(({ data, error }) => {
                if (!active) return;
                if (!error && data?.notification_preferences) {
                    setPreferences({ ...DEFAULT_PREFERENCES, ...data.notification_preferences });
                }
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [user]);

    const handleToggle = async (key: keyof NotificationPreferences) => {
        if (!user || savingKey) return;
        const next = { ...preferences, [key]: !preferences[key] };
        const previous = preferences;

        setSavingKey(key);
        setPreferences(next); // optimistic

        const { error } = await supabase
            .from('profiles')
            .update({ notification_preferences: next })
            .eq('id', user.id);

        if (error) {
            console.error('Failed to update notification preferences:', error);
            setPreferences(previous); // rollback
            toast.error('Could not save preference. Please try again.');
        }
        setSavingKey(null);
    };

    return (
        <Layout wide>
            <div className="settings-page">
                <SettingsPageHeader
                    title="Notification Preferences"
                    subtitle="Manage how AURION AI communicates with you."
                />
                <div className="settings-content">
                    <Card variant="glass" className="settings-card">
                        {loading ? (
                            <p className="settings-card-desc">Loading your preferences…</p>
                        ) : (
                            PREFERENCE_ITEMS.map(item => (
                                <div className="settings-toggle-row" key={item.key}>
                                    <div>
                                        <p className="settings-toggle-label">{item.label}</p>
                                        <p className="settings-toggle-desc">{item.description}</p>
                                    </div>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={preferences[item.key]}
                                        aria-label={item.label}
                                        className={`settings-toggle ${preferences[item.key] ? 'on' : ''}`}
                                        onClick={() => handleToggle(item.key)}
                                        disabled={savingKey === item.key}
                                    />
                                </div>
                            ))
                        )}
                    </Card>
                </div>
            </div>
        </Layout>
    );
};
