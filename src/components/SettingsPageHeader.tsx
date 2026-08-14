import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './SettingsPageHeader.css';

interface SettingsPageHeaderProps {
    title: string;
    subtitle?: string;
}

export const SettingsPageHeader: React.FC<SettingsPageHeaderProps> = ({ title, subtitle }) => {
    const navigate = useNavigate();

    return (
        <div className="settings-page-header">
            <button
                type="button"
                className="settings-back-btn"
                onClick={() => navigate('/profile')}
                aria-label="Back to Profile"
            >
                <ChevronLeft size={18} />
                <span>Profile</span>
            </button>
            <h1 className="settings-page-title">{title}</h1>
            {subtitle && <p className="settings-page-subtitle">{subtitle}</p>}
        </div>
    );
};
