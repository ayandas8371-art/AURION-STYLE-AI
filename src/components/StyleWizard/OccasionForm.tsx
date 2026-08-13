import React from 'react';
import { Calendar, Sun, Cloud, Snowflake, Leaf, PartyPopper, Briefcase, Heart, Users, Shirt } from 'lucide-react';
import styles from './OccasionForm.module.css';

interface OccasionFormProps {
    occasion: string;
    season: string;
    onOccasionChange: (value: string) => void;
    onSeasonChange: (value: string) => void;
}

const occasions = [
    { value: "wedding", label: "Wedding", icon: Heart, description: "Elegant & Traditional" },
    { value: "diwali", label: "Diwali", icon: PartyPopper, description: "Festive & Bright" },
    { value: "office", label: "Office", icon: Briefcase, description: "Professional & Sharp" },
    { value: "date-night", label: "Date Night", icon: Heart, description: "Romantic & Stylish" },
    { value: "party", label: "Party", icon: PartyPopper, description: "Bold & Fun" },
    { value: "casual", label: "Casual", icon: Shirt, description: "Relaxed & Comfortable" },
    { value: "formal", label: "Formal Event", icon: Users, description: "Sophisticated & Classic" },
    { value: "christmas", label: "Christmas", icon: PartyPopper, description: "Festive & Cozy" },
];

const seasons = [
    { value: "summer", label: "Summer", icon: Sun, colors: ["#FFB347", "#FFCC33", "#FF6B6B"] },
    { value: "monsoon", label: "Monsoon", icon: Cloud, colors: ["#4A90A4", "#6B8E23", "#2F4F4F"] },
    { value: "winter", label: "Winter", icon: Snowflake, colors: ["#4169E1", "#8B4513", "#800020"] },
    { value: "spring", label: "Spring", icon: Leaf, colors: ["#98FB98", "#FFB6C1", "#DDA0DD"] },
];

const OccasionForm: React.FC<OccasionFormProps> = ({
    occasion,
    season,
    onOccasionChange,
    onSeasonChange,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.headerText}>
                <h2 className={styles.title}>
                    Where Will You <span className={styles.goldText}>Shine</span>?
                </h2>
                <p className={styles.subtitle}>
                    Tell us the occasion and season for perfectly tailored recommendations
                </p>
            </div>

            {/* Occasion Selection */}
            <div>
                <div className={styles.sectionHeader}>
                    <div className={styles.iconWrapper}>
                        <Calendar size={20} />
                    </div>
                    <label className={styles.label}>Select Occasion</label>
                </div>

                <div className={styles.grid}>
                    {occasions.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = occasion === item.value;
                        return (
                            <button
                                key={item.value}
                                onClick={() => onOccasionChange(item.value)}
                                className={`${styles.cardBtn} ${isActive ? styles.active : ''}`}
                            >
                                <div className={styles.cardIconWrapper}>
                                    <IconComponent size={24} />
                                </div>
                                <h4 className={styles.cardTitle}>{item.label}</h4>
                                <p className={styles.cardDesc}>{item.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Season Selection */}
            <div>
                <div className={styles.sectionHeader}>
                    <div className={styles.iconWrapper}>
                        <Sun size={20} />
                    </div>
                    <label className={styles.label}>Select Season</label>
                </div>

                <div className={styles.grid}>
                    {seasons.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = season === item.value;
                        return (
                            <button
                                key={item.value}
                                onClick={() => onSeasonChange(item.value)}
                                className={`${styles.cardBtn} ${styles.seasonBtn} ${isActive ? styles.active : ''}`}
                            >
                                <div className={styles.seasonIconWrapper}>
                                    <IconComponent size={28} />
                                </div>
                                <h4 className={styles.seasonTitle}>{item.label}</h4>

                                {/* Color palette preview */}
                                <div className={styles.colorPalette}>
                                    {item.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className={styles.colorDot}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OccasionForm;
