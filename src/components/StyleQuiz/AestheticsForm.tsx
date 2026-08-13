import { Palette, Scissors } from 'lucide-react';
import styles from './FormComponents.module.css';

interface AestheticsFormProps {
    quizData: any;
    setQuizData: (data: any) => void;
}

const SKIN_TONES = [
    { id: 'Fair', label: 'Fair / Light', hex: '#fadcde' },
    { id: 'Medium', label: 'Medium', hex: '#dca67b' },
    { id: 'Olive', label: 'Olive / Tan', hex: '#c58d62' },
    { id: 'Deep', label: 'Deep / Rich', hex: '#714b35' },
];

const HAIR_COLORS = [
    { id: 'Black', label: 'Black', hex: '#111111' },
    { id: 'Brown', label: 'Brown', hex: '#4B3621' },
    { id: 'Blonde', label: 'Blonde', hex: '#E6C687' },
    { id: 'Red', label: 'Red / Auburn', hex: '#8B3A3A' },
    { id: 'Gray', label: 'Gray / Silver', hex: '#B5B5B5' },
    { id: 'Vibrant', label: 'Vibrant (Dyed)', hex: '#8A2BE2' },
];

export const AestheticsForm = ({ quizData, setQuizData }: AestheticsFormProps) => {

    return (
        <div className={styles.sectionWrapper}>
            {/* Skin Tone Section */}
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <Palette size={24} className={styles.icon} />
                    </div>
                    <h2 className={styles.title}>Select your primary skin tone</h2>
                    <p className={styles.subtitle}>Crucial for seasonal color analysis and recommending complementary metals.</p>
                </div>

                <div className={styles.presetList} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {SKIN_TONES.map((tone) => {
                        const isActive = quizData.skinTone === tone.id;
                        return (
                            <button
                                key={tone.id}
                                className={`${styles.visualCard} ${isActive ? styles.active : ''}`}
                                style={{ minWidth: '120px', flex: 1 }}
                                onClick={() => setQuizData((prev: any) => ({ ...prev, skinTone: tone.id }))}
                            >
                                <div className={styles.swatchIcon} style={{ background: tone.hex }} />
                                <span className={styles.visualTitle}>{tone.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Hair Color Section */}
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <Scissors size={24} className={styles.icon} />
                    </div>
                    <h2 className={styles.title}>What is your hair color?</h2>
                </div>

                <div className={styles.visualGrid} style={{ maxWidth: '600px' }}>
                    {HAIR_COLORS.map((hair) => {
                        const isActive = quizData.hairColor === hair.id;
                        return (
                            <button
                                key={hair.id}
                                className={`${styles.visualCard} ${isActive ? styles.active : ''}`}
                                onClick={() => setQuizData((prev: any) => ({ ...prev, hairColor: hair.id }))}
                            >
                                <div className={styles.swatchIcon} style={{ background: hair.hex, width: '40px', height: '40px' }} />
                                <span className={styles.visualTitle}>{hair.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
