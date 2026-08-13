import { ArrowUpDown } from 'lucide-react';
import styles from './FormComponents.module.css';

interface HeightFormProps {
    quizData: any;
    setQuizData: (data: any) => void;
}

const HEIGHT_PRESETS = [
    { label: 'Under 150 cm (4\'11" & below)', min: 100, max: 150 },
    { label: '150 - 160 cm (4\'11" - 5\'3")', min: 151, max: 160 },
    { label: '161 - 170 cm (5\'3" - 5\'7")', min: 161, max: 170 },
    { label: '171 - 180 cm (5\'7" - 5\'11")', min: 171, max: 180 },
    { label: '181 - 190 cm (5\'11" - 6\'3")', min: 181, max: 190 },
    { label: 'Over 190 cm (6\'3" & above)', min: 191, max: 250 },
];

export const HeightForm = ({ quizData, setQuizData }: HeightFormProps) => {

    const handleSelect = (preset: typeof HEIGHT_PRESETS[0]) => {
        setQuizData((prev: any) => ({
            ...prev,
            heightMin: preset.min,
            heightMax: preset.max
        }));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <ArrowUpDown size={24} className={styles.icon} />
                </div>
                <h2 className={styles.title}>What is your height?</h2>
                <p className={styles.subtitle}>Helps AI determine optimal hemlines and vertical proportions.</p>
            </div>

            <div className={styles.presetList}>
                {HEIGHT_PRESETS.map((preset) => {
                    const isActive = quizData.heightMin === preset.min && quizData.heightMax === preset.max;
                    return (
                        <button
                            key={preset.label}
                            className={`${styles.presetBtn} ${isActive ? styles.active : ''}`}
                            onClick={() => handleSelect(preset)}
                        >
                            <span className={styles.presetLabel}>{preset.label}</span>
                            <div className={styles.radioCircle}>
                                {isActive && <div className={styles.radioInner} />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
