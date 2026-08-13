import React from 'react';
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

const BudgetForm: React.FC<BudgetFormProps> = ({
    budgetMin,
    budgetMax,
    onBudgetMinChange,
    onBudgetMaxChange,
}) => {
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
                        <label className={styles.inputLabel}>Minimum</label>
                        <div className={styles.inputWrapper}>
                            <IndianRupee className={styles.rupeeIcon} size={14} />
                            <input
                                type="number"
                                value={budgetMin}
                                onChange={(e) => onBudgetMinChange(Number(e.target.value))}
                                min={1000}
                                max={budgetMax - 1000}
                                className={styles.numberInput}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Maximum</label>
                        <div className={styles.inputWrapper}>
                            <IndianRupee className={styles.rupeeIcon} size={14} />
                            <input
                                type="number"
                                value={budgetMax}
                                onChange={(e) => onBudgetMaxChange(Number(e.target.value))}
                                min={budgetMin + 1000}
                                max={100000}
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
