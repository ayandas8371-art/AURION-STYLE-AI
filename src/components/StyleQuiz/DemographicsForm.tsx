import { User, Activity, Triangle, Circle, Square } from 'lucide-react';
import styles from './FormComponents.module.css';

interface DemographicsFormProps {
    quizData: any;
    setQuizData: (data: any) => void;
}

const BODY_TYPES = [
    { id: 'Hourglass', label: 'Hourglass', icon: Activity, desc: 'Balanced bust & hips, defined waist' },
    { id: 'Pear', label: 'Pear', icon: Triangle, desc: 'Hips wider than bust & shoulders' },
    { id: 'Inverted Triangle', label: 'Inverted Triangle', icon: Triangle, style: { transform: 'rotate(180deg)' }, desc: 'Shoulders/bust wider than hips' },
    { id: 'Rectangle', label: 'Rectangle', icon: Square, desc: 'Straight up & down, little waist definition' },
    { id: 'Apple', label: 'Apple', icon: Circle, desc: 'Fuller around the midsection' },
    { id: 'Not Sure', label: 'Not Sure', icon: User, desc: 'The AI will help figure this out' },
];

export const DemographicsForm = ({ quizData, setQuizData }: DemographicsFormProps) => {

    const handleGenderSelect = (gender: string) => {
        setQuizData((prev: any) => ({ ...prev, gender }));
    };

    const handleBodySelect = (bodyType: string) => {
        setQuizData((prev: any) => ({ ...prev, bodyType }));
    };

    return (
        <div className={styles.sectionWrapper}>
            {/* Gender Section */}
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Which styles do you prefer?</h2>
                </div>

                <div className={styles.presetList} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {['Womenswear', 'Menswear', 'Unisex / Neutral'].map((gender) => {
                        const isActive = quizData.gender === gender;
                        return (
                            <button
                                key={gender}
                                className={`${styles.presetBtn} ${isActive ? styles.active : ''}`}
                                style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}
                                onClick={() => handleGenderSelect(gender)}
                            >
                                <span className={styles.presetLabel} style={{ textAlign: 'center' }}>{gender}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Body Type Section */}
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h2 className={styles.title}>What is your body type?</h2>
                    <p className={styles.subtitle}>Our AI uses this to recommend the perfect fit and silhouettes.</p>
                </div>

                <div className={styles.visualGrid}>
                    {BODY_TYPES.map((type) => {
                        const isActive = quizData.bodyType === type.id;
                        const IconComponent = type.icon;
                        return (
                            <button
                                key={type.id}
                                className={`${styles.visualCard} ${isActive ? styles.active : ''}`}
                                onClick={() => handleBodySelect(type.id)}
                            >
                                <div className={styles.visualIcon}>
                                    <IconComponent size={24} style={type.style} />
                                </div>
                                <span className={styles.visualTitle}>{type.label}</span>
                                <span className={styles.stepSubtitle} style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '-4px' }}>
                                    {type.desc}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
