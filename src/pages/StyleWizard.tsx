import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import styles from './StyleWizard.module.css';

import PhotoUpload from '../components/StyleWizard/PhotoUpload';
import AttributesForm from '../components/StyleWizard/AttributesForm';
import OccasionForm from '../components/StyleWizard/OccasionForm';
import BudgetForm from '../components/StyleWizard/BudgetForm';

import bgPhoto from '../assets/wizard-bg-photo.png';
import bgAttributes from '../assets/wizard-bg-attributes.png';
import bgOccasion from '../assets/wizard-bg-occasion.png';
import bgBudget from '../assets/wizard-bg-budget.png';

const STEP_DATA = [
    { id: 1, title: 'Photo', subtitle: 'Upload your photo' },
    { id: 2, title: 'About You', subtitle: 'Your features' },
    { id: 3, title: 'Occasion', subtitle: 'When & where' },
    { id: 4, title: 'Budget', subtitle: 'Your range' },
];

export const StyleWizard = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);

    // Consolidating all profile state into one object
    const [profile, setProfile] = useState({
        photo: null as File | null,
        gender: '',
        skinTone: '',
        hairColor: '',
        bodyType: '',
        occasion: '',
        season: '',
        budgetMin: 5000,
        budgetMax: 25000,
    });

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Process result logic would go here
            console.log('Submitting profile:', profile);
            navigate('/home'); // Or to a 'processing' / recommendations route
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return true; // Photo is optional
            case 2:
                return profile.gender && profile.skinTone && profile.hairColor && profile.bodyType;
            case 3:
                return profile.occasion && profile.season;
            case 4:
                return profile.budgetMin > 0 && profile.budgetMax > profile.budgetMin;
            default:
                return false;
        }
    };

    const getValidationMessage = () => {
        switch (currentStep) {
            case 2: {
                const missing = [];
                if (!profile.gender) missing.push('gender');
                if (!profile.skinTone) missing.push('skin tone');
                if (!profile.hairColor) missing.push('hair color');
                if (!profile.bodyType) missing.push('body type');
                return missing.length > 0 ? `Please select your ${missing.join(', ')}` : '';
            }
            case 3:
                if (!profile.occasion && !profile.season) return 'Please select an occasion and season';
                if (!profile.occasion) return 'Please select an occasion';
                if (!profile.season) return 'Please select a season';
                return '';
            default:
                return '';
        }
    };

    const getBackgroundImage = (step: number) => {
        switch (step) {
            case 1: return bgPhoto;
            case 2: return bgAttributes;
            case 3: return bgOccasion;
            case 4: return bgBudget;
            default: return bgPhoto;
        }
    };

    return (
        <div className={styles.wizardContainer}>
            {/* Background Image Layer */}
            <div
                className={styles.dynamicBackground}
                style={{ backgroundImage: `url(${getBackgroundImage(currentStep)})` }}
            />

            {/* Content Layer */}
            <div className={styles.contentLayer}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <button onClick={() => navigate('/home')} className={styles.backButton} aria-label="Back to Home">
                            <ArrowLeft size={20} />
                            <span className={styles.backButtonLabel}>Back to Home</span>
                        </button>

                        <div className={styles.brand}>
                            <Sparkles size={20} />
                            <span>LuxFit AI</span>
                        </div>

                        <div className={styles.stepIndicatorInfo}>
                            Step {currentStep} of 4
                        </div>
                    </div>
                </header>

                {/* Progress Bar */}
                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                </div>

                {/* Step Nav (Numbers) */}
                <div className={styles.stepsNav}>
                    {STEP_DATA.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        let itemClass = styles.stepNavItem;
                        if (isActive) itemClass += ` ${styles.active}`;
                        if (isCompleted) itemClass += ` ${styles.completed}`;

                        return (
                            <button
                                key={step.id}
                                className={itemClass}
                                onClick={() => isCompleted && setCurrentStep(step.id)}
                                disabled={!isCompleted && !isActive}
                            >
                                <div className={styles.stepNumber}>
                                    {isCompleted ? '✓' : step.id}
                                </div>
                                <div className={styles.stepText}>
                                    <p className={styles.stepTitle}>{step.title}</p>
                                    <p className={styles.stepSubtitle}>{step.subtitle}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Main Form Content */}
                <main className={styles.mainContent}>

                    {currentStep === 1 && (
                        <PhotoUpload
                            photo={profile.photo}
                            onPhotoChange={(photo) => setProfile(p => ({ ...p, photo }))}
                        />
                    )}

                    {currentStep === 2 && (
                        <AttributesForm
                            gender={profile.gender}
                            skinTone={profile.skinTone}
                            hairColor={profile.hairColor}
                            bodyType={profile.bodyType}
                            onGenderChange={(gender) => setProfile(p => ({ ...p, gender }))}
                            onSkinToneChange={(skinTone) => setProfile(p => ({ ...p, skinTone }))}
                            onHairColorChange={(hairColor) => setProfile(p => ({ ...p, hairColor }))}
                            onBodyTypeChange={(bodyType) => setProfile(p => ({ ...p, bodyType }))}
                        />
                    )}

                    {currentStep === 3 && (
                        <OccasionForm
                            occasion={profile.occasion}
                            season={profile.season}
                            onOccasionChange={(occasion) => setProfile(p => ({ ...p, occasion }))}
                            onSeasonChange={(season) => setProfile(p => ({ ...p, season }))}
                        />
                    )}

                    {currentStep === 4 && (
                        <BudgetForm
                            budgetMin={profile.budgetMin}
                            budgetMax={profile.budgetMax}
                            onBudgetMinChange={(budgetMin) => setProfile(p => ({ ...p, budgetMin }))}
                            onBudgetMaxChange={(budgetMax) => setProfile(p => ({ ...p, budgetMax }))}
                        />
                    )}

                    {/* Validation Errors */}
                    {!isStepValid() && getValidationMessage() && (
                        <div className={styles.validationMessage}>
                            <AlertCircle size={20} />
                            <span>{getValidationMessage()}</span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className={styles.footerNav}>
                        <button
                            className={`${styles.btn} ${styles.btnBack}`}
                            onClick={handleBack}
                            disabled={currentStep === 1}
                        >
                            <ArrowLeft size={20} /> Back
                        </button>

                        <button
                            className={`${styles.btn} ${styles.btnNext}`}
                            onClick={handleNext}
                            disabled={!isStepValid()}
                        >
                            {currentStep === 4 ? (
                                <>
                                    <Sparkles size={20} /> Get Recommendations
                                </>
                            ) : (
                                <>
                                    Continue <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};
