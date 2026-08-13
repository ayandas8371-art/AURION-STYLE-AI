import { Calendar, Cloud, Sun, Leaf, Snowflake } from 'lucide-react';
import styles from './FormComponents.module.css';

interface OccasionFormProps {
    quizData: any;
    setQuizData: (data: any) => void;
}

const OCCASIONS = [
    { id: 'Work', label: 'Work / Office', icon: '💼' },
    { id: 'Casual', label: 'Everyday Casual', icon: '☕' },
    { id: 'Date', label: 'Date Night', icon: '🍷' },
    { id: 'Party', label: 'Party / Event', icon: '🎉' },
    { id: 'Wedding', label: 'Wedding Guest', icon: '🥂' },
    { id: 'Vacation', label: 'Resort / Vacation', icon: '✈️' },
];

const SEASONS = [
    { id: 'Spring', label: 'Spring', icon: Leaf },
    { id: 'Summer', label: 'Summer', icon: Sun },
    { id: 'Autumn', label: 'Autumn', icon: Cloud },
    { id: 'Winter', label: 'Winter', icon: Snowflake },
];

export const OccasionForm = ({ quizData, setQuizData }: OccasionFormProps) => {

    return (
        <div className={styles.sectionWrapper}>
            {/* Occasion Section */}
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <Calendar size={24} className={styles.icon} />
                    </div>
                    <h2 className={styles.title}>What are we dressing for?</h2>
                </div>

                <div className={styles.visualGrid}>
                    {OCCASIONS.map((occ) => {
                        const isActive = quizData.occasion === occ.id;
                        return (
                            <button
                                key={occ.id}
                                className={`${styles.visualCard} ${isActive ? styles.active : ''}`}
                                onClick={() => setQuizData((prev: any) => ({ ...prev, occasion: occ.id }))}
                            >
                                <div className={styles.visualIcon} style={{ fontSize: '1.5rem', background: 'transparent' }}>
                                    {occ.icon}
                                </div>
                                <span className={styles.visualTitle}>{occ.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Season Section */}
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Target Season</h2>
                </div>

                <div className={styles.presetList} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {SEASONS.map((season) => {
                        const isActive = quizData.season === season.id;
                        const IconComponent = season.icon;
                        return (
                            <button
                                key={season.id}
                                className={`${styles.visualCard} ${isActive ? styles.active : ''}`}
                                style={{ minWidth: '120px', flex: 1, padding: '1.5rem 1rem' }}
                                onClick={() => setQuizData((prev: any) => ({ ...prev, season: season.id }))}
                            >
                                <IconComponent size={24} className={isActive ? styles.active : ''} />
                                <span className={styles.visualTitle}>{season.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
