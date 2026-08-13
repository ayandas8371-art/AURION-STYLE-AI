import React from 'react';
import { User, Palette, Sparkles, ChevronDown } from 'lucide-react';
import styles from './AttributesForm.module.css';

interface AttributesFormProps {
    gender: string;
    skinTone: string;
    hairColor: string;
    bodyType: string;
    onGenderChange: (value: string) => void;
    onSkinToneChange: (value: string) => void;
    onHairColorChange: (value: string) => void;
    onBodyTypeChange: (value: string) => void;
}

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
];

const skinToneOptions = [
    { value: "fair", label: "Fair" },
    { value: "light", label: "Light" },
    { value: "medium", label: "Medium" },
    { value: "olive", label: "Olive" },
    { value: "tan", label: "Tan" },
    { value: "brown", label: "Brown" },
    { value: "dark", label: "Dark" },
];

const hairColorOptions = [
    { value: "black", label: "Black" },
    { value: "brown", label: "Brown" },
    { value: "blonde", label: "Blonde" },
    { value: "red", label: "Red" },
    { value: "gray", label: "Gray" },
    { value: "white", label: "White" },
];

const bodyTypeOptions = [
    { value: "slim", label: "Slim" },
    { value: "athletic", label: "Athletic" },
    { value: "average", label: "Average" },
    { value: "muscular", label: "Muscular" },
    { value: "heavy", label: "Heavy" },
];

const AttributesForm: React.FC<AttributesFormProps> = ({
    gender,
    skinTone,
    hairColor,
    bodyType,
    onGenderChange,
    onSkinToneChange,
    onHairColorChange,
    onBodyTypeChange,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.headerText}>
                <h2 className={styles.title}>
                    Tell Us About <span className={styles.goldText}>Yourself</span>
                </h2>
                <p className={styles.subtitle}>
                    These details help us find colors and styles that suit you perfectly
                </p>
            </div>

            <div className={styles.grid}>
                {/* Gender */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <User size={20} />
                        </div>
                        <label className={styles.label}>Gender</label>
                    </div>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={gender}
                            onChange={(e) => onGenderChange(e.target.value)}
                        >
                            <option value="" disabled hidden>Select your gender</option>
                            {genderOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className={styles.chevron} size={16} />
                    </div>
                </div>

                {/* Skin Tone */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <Palette size={20} />
                        </div>
                        <label className={styles.label}>Skin Tone</label>
                    </div>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={skinTone}
                            onChange={(e) => onSkinToneChange(e.target.value)}
                        >
                            <option value="" disabled hidden>Select your skin tone</option>
                            {skinToneOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className={styles.chevron} size={16} />
                    </div>
                </div>

                {/* Hair Color */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <Sparkles size={20} />
                        </div>
                        <label className={styles.label}>Hair Color</label>
                    </div>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={hairColor}
                            onChange={(e) => onHairColorChange(e.target.value)}
                        >
                            <option value="" disabled hidden>Select your hair color</option>
                            {hairColorOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className={styles.chevron} size={16} />
                    </div>
                </div>

                {/* Body Type */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <User size={20} />
                        </div>
                        <label className={styles.label}>Body Type</label>
                    </div>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={bodyType}
                            onChange={(e) => onBodyTypeChange(e.target.value)}
                        >
                            <option value="" disabled hidden>Select your body type</option>
                            {bodyTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className={styles.chevron} size={16} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AttributesForm;
