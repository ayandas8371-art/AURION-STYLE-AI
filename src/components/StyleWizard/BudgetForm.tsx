import React, { useEffect, useState } from 'react';
import { Wallet, IndianRupee, Lightbulb } from 'lucide-react';
import styles from './BudgetForm.module.css';

interface BudgetFormProps {
    budgetMin: number;
    budgetMax: number;
    onBudgetMinChange: (value: number) => void;
    onBudgetMaxChange: (value: number) => void;
}

const budgetRanges = [
    { label: "Budget Friendly", min: 2000, max: 8000, description: "Great value picks" },
    { label: "Mid Range", min: 8000, max: 20000, description: "Quality & style balance" },
    { label: "Premium", min: 20000, max: 50000, description: "Designer selections" },
    { label: "Luxury", min: 50000, max: 100000, description: "Top-tier fashion" },
];

const ABSOLUTE_MIN = 1000;
const ABSOLUTE_MAX = 100000;
const STEP = 1000;

const BudgetForm: React.FC<BudgetFormProps> = ({
    budgetMin,
    budgetMax,
    onBudgetMinChange,
    onBudgetMaxChange,
}) => {
    // Editing state is a plain string so the field can be temporarily empty
    // (or mid-typed) without being forced back to "0" on every keystroke -
    // that forced coercion (Number(e.target.value) on each change) was the
    // cause of the leading-zero bug. The numeric budgetMin/budgetMax props
    // remain the single source of truth; these just mirror them for display
    // while editing, and resync whenever the prop changes from elsewhere
    // (slider drag, preset click).
    const [minInput, setMinInput] = useState(String(budgetMin));
    const [maxInput, setMaxInput] = useState(String(budgetMax));

    useEffect(() => {
        setMinInput(String(budgetMin));
    }, [budgetMin]);

    useEffect(() => {
        setMaxInput(String(budgetMax));
    }, [budgetMax]);

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw !== '' && !/^\d+$/.test(raw)) return; // reject non-numeric/negative input
        const cleaned = raw.replace(/^0+(?=\d)/, ''); // strip leading zeros, e.g. pasted "007000"
        setMinInput(cleaned);
        if (cleaned === '') return; // allow a temporarily empty field while editing
        const num = Number(cleaned);
        if (num < budgetMax) {
            onBudgetMinChange(num);
        }
    };

    const handleMinBlur = () => {
        const num = minInput === '' ? budgetMin : Number(minInput);
        const clamped = Math.min(Math.max(num, ABSOLUTE_MIN), budgetMax - STEP);
        onBudgetMinChange(clamped);
        setMinInput(String(clamped));
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw !== '' && !/^\d+$/.test(raw)) return;
        const cleaned = raw.replace(/^0+(?=\d)/, '');
        setMaxInput(cleaned);
        if (cleaned === '') return;
        const num = Number(cleaned);
        if (num > budgetMin) {
            onBudgetMaxChange(num);
        }
    };

    const handleMaxBlur = () => {
        const num = maxInput === '' ? budgetMax : Number(maxInput);
        const clamped = Math.max(Math.min(num, ABSOLUTE_MAX), budgetMin + STEP);
        onBudgetMaxChange(clamped);
        setMaxInput(String(clamped));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handlePresetClick = (min: number, max: number) => {
        onBudgetMinChange(min);
        onBudgetMaxChange(max);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerText}>
                <h2 className={styles.title}>
                    Set Your <span className={styles.goldText}>Budget</span>
                </h2>
                <p className={styles.subtitle}>
                    We'll find the best outfits that match your style and budget
                </p>
            </div>

            {/* Quick Presets */}
            <div>
                <label className={styles.presetLabel}>Quick Select</label>
                <div className={styles.presetGrid}>
                    {budgetRanges.map((range) => {
                        const isActive = budgetMin === range.min && budgetMax === range.max;
                        return (
                            <button
                                key={range.label}
                                onClick={() => handlePresetClick(range.min, range.max)}
                                className={`${styles.presetBtn} ${isActive ? styles.active : ''}`}
                                type="button"
                            >
                                <span className={styles.presetTitle}>{range.label}</span>
                                <span className={styles.presetDesc}>{range.description}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Budget Display */}
            <div className={styles.displayCard}>
                <div className={styles.displayHeader}>
                    <div className={styles.displayIconWrapper}>
                        <Wallet size={24} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <p className={styles.displayLabel}>Your Budget Range</p>
                        <p className={styles.displayValue}>
                            {formatCurrency(budgetMin)} - {formatCurrency(budgetMax)}
                        </p>
                    </div>
                </div>

                {/* Sliders Area (using 2 native ranges to simulate a dual slider simply) */}
                <div className={styles.sliderArea}>
                    <div className={styles.rangeInputs}>
                        <div className={styles.rangeInputWrapper}>
                            <input
                                type="range"
                                min="1000"
                                max="50000"
                                step="1000"
                                value={budgetMin}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    // Ensure Min doesn't exceed Max
                                    if (val < budgetMax) onBudgetMinChange(val);
                                }}
                            />
                        </div>
                        <div className={styles.rangeInputWrapper}>
                            <input
                                type="range"
                                min="5000"
                                max="100000"
                                step="1000"
                                value={budgetMax}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    // Ensure Max always above Min
                                    if (val > budgetMin) onBudgetMaxChange(val);
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.sliderLabels}>
                        <span>₹1,000</span>
                        <span>₹1,00,000</span>
                    </div>
                </div>

                {/* Manual Input Fields */}
                <div className={styles.manualInputs}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="budget-min-input">Minimum</label>
                        <div className={styles.inputWrapper}>
                            <IndianRupee className={styles.rupeeIcon} size={14} />
                            <input
                                id="budget-min-input"
                                type="number"
                                inputMode="numeric"
                                value={minInput}
                                onChange={handleMinInputChange}
                                onBlur={handleMinBlur}
                                min={ABSOLUTE_MIN}
                                max={budgetMax - STEP}
                                className={styles.numberInput}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="budget-max-input">Maximum</label>
                        <div className={styles.inputWrapper}>
                            <IndianRupee className={styles.rupeeIcon} size={14} />
                            <input
                                id="budget-max-input"
                                type="number"
                                inputMode="numeric"
                                value={maxInput}
                                onChange={handleMaxInputChange}
                                onBlur={handleMaxBlur}
                                min={budgetMin + STEP}
                                max={ABSOLUTE_MAX}
                                className={styles.numberInput}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.infoNote}>
                <Lightbulb size={16} />
                We'll show you the best deals within your budget from top stores
            </div>
        </div>
    );
};

export default BudgetForm;
