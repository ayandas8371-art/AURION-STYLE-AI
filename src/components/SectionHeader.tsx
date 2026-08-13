import React from 'react';
import { Heart, Briefcase, Sparkles, User, Sun, Crown } from 'lucide-react';
import './SectionHeader.css';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: string;
}

const IconMap: any = {
    Heart, Briefcase, Sparkles, User, Sun, Crown
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon }) => {
    const IconComponent = icon ? IconMap[icon] : Sparkles;

    return (
        <div className="section-header">
            <div className="section-icon-wrapper">
                <IconComponent size={20} className="text-gold" />
            </div>
            <div className="section-text">
                <h3 className="section-title">{title}</h3>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </div>
        </div>
    );
};
