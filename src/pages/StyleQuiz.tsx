import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import styles from './StyleQuiz.module.css';

import { HeightForm } from '../components/StyleQuiz/HeightForm';
import { DemographicsForm } from '../components/StyleQuiz/DemographicsForm';
import { AestheticsForm } from '../components/StyleQuiz/AestheticsForm';
import { OccasionForm } from '../components/StyleQuiz/OccasionForm';
import BudgetForm from '../components/StyleWizard/BudgetForm';
// import ReportGeneratingScreen from '../components/StyleQuiz/ReportGeneratingScreen';

const STEP_DATA = [
    { id: 1, title: 'Basics', subtitle: 'Height & Gender' },
    { id: 2, title: 'Features', subtitle: 'Body & Tone' },
    { id: 3, title: 'Occasion', subtitle: 'When & Where' },
    { id: 4, title: 'Budget', subtitle: 'Your Range' },
];

export const StyleQuiz = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);

    const [quizData, setQuizData] = useState({
        heightMin: 150,
        heightMax: 180,
        gender: '',
        bodyType: '',
        skinTone: '',
        hairColor: '',
        occasion: '',
        season: '',
        budgetMin: 5000,
        budgetMax: 25000,
    });

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        } else {
            generateReport();
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
                return quizData.gender !== '';
            case 2:
                return quizData.bodyType && quizData.skinTone && quizData.hairColor;
            case 3:
                return quizData.occasion && quizData.season;
            case 4:
                return quizData.budgetMin > 0 && quizData.budgetMax > quizData.budgetMin;
            default:
                return false;
        }
    };

    const getValidationMessage = () => {
        switch (currentStep) {
            case 1:
                return !quizData.gender ? 'Please select your gender' : '';
            case 2: {
                const missing = [];
                if (!quizData.bodyType) missing.push('body type');
                if (!quizData.skinTone) missing.push('skin tone');
                if (!quizData.hairColor) missing.push('hair color');
                return missing.length > 0 ? `Please select your ${missing.join(', ')}` : '';
            }
            case 3:
                if (!quizData.occasion && !quizData.season) return 'Please select an occasion and season';
                if (!quizData.occasion) return 'Please select an occasion';
                if (!quizData.season) return 'Please select a season';
                return '';
            case 4:
                return !(quizData.budgetMin > 0 && quizData.budgetMax > quizData.budgetMin)
                    ? 'Please set a valid budget range'
                    : '';
            default:
                return '';
        }
    };

    const generateReport = async () => {
        setIsGenerating(true);
        // Simulate API call to the Edge Function edge
        setTimeout(() => {
            setIsGenerating(false);
            console.log("Quiz Data Payload:", quizData);
            // navigate('/dossier', { state: { report: mockData } })
        }, 3000);
    };

    if (isGenerating) {
        return (
            <div className={styles.generatingContainer}>
                <div className={styles.spinner}></div>
                <h2 className={styles.generatingTitle}>Analyzing Your Profile...</h2>
                <p className={styles.generatingText}>Our AI stylists are curating your perfect $10M wardrobe.</p>
            </div>
        );
    }

    return (
        <div className={styles.wizardContainer}>
            {/* Background Content Layer */}
            <div className={styles.dynamicBackground} />

            <div className={styles.contentLayer}>
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <button onClick={() => navigate('/home')} className={styles.backButton}>
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <div className={styles.brand}>
                            <Sparkles size={20} />
                            <span>AURION AI Quiz</span>
                        </div>
                        <div className={styles.stepIndicatorInfo}>
                            Step {currentStep} of 4
                        </div>
                    </div>
                </header>

                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                </div>

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

                <main className={styles.mainContent}>
                    {/* Render specific step based on state */}
                    {currentStep === 1 && (
                        <div className="animate-fade-in">
                            <HeightForm quizData={quizData} setQuizData={setQuizData} />
                            <div className={styles.divider} style={{ margin: '2rem 0', height: '1px', background: 'var(--glass-border)' }} />
                            <DemographicsForm quizData={quizData} setQuizData={setQuizData} />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-fade-in">
                            <AestheticsForm quizData={quizData} setQuizData={setQuizData} />
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-fade-in">
                            <OccasionForm quizData={quizData} setQuizData={setQuizData} />
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="animate-fade-in">
                            <BudgetForm
                                budgetMin={quizData.budgetMin}
                                budgetMax={quizData.budgetMax}
                                onBudgetMinChange={(val) => setQuizData(prev => ({ ...prev, budgetMin: val }))}
                                onBudgetMaxChange={(val) => setQuizData(prev => ({ ...prev, budgetMax: val }))}
                            />
                        </div>
                    )}

                    {!isStepValid() && getValidationMessage() && (
                        <div className={styles.validationMessage}>
                            <AlertCircle size={20} />
                            <span>{getValidationMessage()}</span>
                        </div>
                    )}

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
                                    <Sparkles size={20} /> Generate Dossier
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
