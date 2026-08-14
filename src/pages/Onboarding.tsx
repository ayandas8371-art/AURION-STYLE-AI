import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Camera, ArrowRight, ArrowLeft, Check, Briefcase, Heart, PartyPopper } from 'lucide-react';
import './Onboarding.css';

// Types
type Step = 'photo' | 'attributes' | 'occasions' | 'season' | 'budget' | 'processing';

export const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<Step>('photo');

    // State
    const [formData, setFormData] = useState({
        photo: null as File | null,
        gender: 'Female',
        skinTone: '#E0AC69',
        height: 165,
        bodyShape: 'Hourglass',
        occasions: [] as string[],
        seasons: [] as string[],
        budget: 25000
    });

    const nextStep = (step: Step) => {
        setCurrentStep(step);
        window.scrollTo(0, 0);
    };

    const handleFinish = () => {
        setCurrentStep('processing');
        // Simulate AI processing
        setTimeout(() => navigate('/home'), 4000);
    };

    const renderProgressBar = () => {
        const steps = ['photo', 'attributes', 'occasions', 'season', 'budget'];
        const index = steps.indexOf(currentStep);
        const percentage = ((index + 1) / steps.length) * 100;

        if (currentStep === 'processing') return null;

        return (
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }} />
            </div>
        );
    };

    return (
        <Layout showNav={false}>
            <div className="onboarding-page">
                {renderProgressBar()}

                {currentStep === 'photo' && (
                    <StepPhoto
                        onNext={() => nextStep('attributes')}
                        onUpload={(file) => setFormData({ ...formData, photo: file })}
                    />
                )}

                {currentStep === 'attributes' && (
                    <StepAttributes
                        data={formData}
                        onChange={(field: string, val: any) => setFormData({ ...formData, [field]: val })}
                        onNext={() => nextStep('occasions')}
                        onBack={() => nextStep('photo')}
                    />
                )}

                {currentStep === 'occasions' && (
                    <StepOccasions
                        selected={formData.occasions}
                        onChange={(list: string[]) => setFormData({ ...formData, occasions: list })}
                        onNext={() => nextStep('season')}
                        onBack={() => nextStep('attributes')}
                    />
                )}

                {currentStep === 'season' && (
                    <StepSeason
                        selected={formData.seasons}
                        onChange={(list: string[]) => setFormData({ ...formData, seasons: list })}
                        onNext={() => nextStep('budget')}
                        onBack={() => nextStep('occasions')}
                    />
                )}

                {currentStep === 'budget' && (
                    <StepBudget
                        value={formData.budget}
                        onChange={(val: number) => setFormData({ ...formData, budget: val })}
                        onFinish={handleFinish}
                        onBack={() => nextStep('season')}
                    />
                )}

                {currentStep === 'processing' && <StepProcessing />}
            </div>
        </Layout>
    );
};

// Sub-components for steps (Inline for now to keep context together, can split later)

const StepPhoto = ({ onNext, onUpload }: { onNext: () => void, onUpload: (f: File) => void }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="step-container fade-in">
            <div className="step-header">
                <h2>Your Style Journey</h2>
                <p>AURION AI uses your photo to personalize your experience</p>
            </div>

            <div
                className="photo-upload-area"
                onClick={() => inputRef.current?.click()}
                style={{ cursor: 'pointer' }}
            >
                <div className="photo-circle">
                    <Camera size={48} className="text-gold" />
                </div>
                <p className="mt-4 text-sm text-secondary">Tap to upload a selfie</p>
                <input
                    type="file"
                    hidden
                    ref={inputRef}
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            onUpload(e.target.files[0]);
                            // Ideally show preview here
                        }
                    }}
                />
            </div>

            <div className="step-footer">
                <Button fullWidth onClick={onNext}>Continue</Button>
                <Button variant="ghost" fullWidth className="mt-2" onClick={onNext}>Skip for now</Button>
            </div>
        </div>
    );
};

const StepAttributes = ({ data, onChange, onNext, onBack }: any) => (
    <div className="step-container fade-in">
        <div className="step-header">
            <h2>About You</h2>
            <p>Tell us a bit about yourself for better styling</p>
        </div>

        <div className="form-group">
            <label>Gender</label>
            <div className="pill-group">
                {['Female', 'Male', 'Non-binary'].map(g => (
                    <div key={g}
                        className={`pill ${data.gender === g ? 'active' : ''}`}
                        onClick={() => onChange('gender', g)}
                    >
                        {g}
                    </div>
                ))}
            </div>
        </div>

        {/* More sliders/selectors would go here for height etc */}
        <div className="form-group">
            <label>Height: {data.height} cm</label>
            <input
                type="range" min="140" max="200"
                value={data.height}
                onChange={(e) => onChange('height', parseInt(e.target.value))}
                className="slider"
            />
        </div>

        <div className="step-footer">
            <Button fullWidth onClick={onNext} rightIcon={<ArrowRight size={18} />}>Next Step</Button>
            <Button variant="ghost" fullWidth onClick={onBack} leftIcon={<ArrowLeft size={18} />}>Back</Button>
        </div>
    </div>
);

const StepOccasions = ({ selected, onChange, onNext, onBack }: any) => {
    const occasions = [
        { id: 'wedding', label: 'Wedding', icon: <Heart size={20} /> },
        { id: 'party', label: 'Party', icon: <PartyPopper size={20} /> },
        { id: 'office', label: 'Office', icon: <Briefcase size={20} /> },
        { id: 'friends', label: 'Casual', icon: <User size={20} /> }
    ];
    // Need to handle toggle
    const toggle = (id: string) => {
        if (selected.includes(id)) onChange(selected.filter((x: string) => x !== id));
        else onChange([...selected, id]);
    };

    return (
        <div className="step-container fade-in">
            <div className="step-header">
                <h2>Occasions</h2>
                <p>What are you dressing for?</p>
            </div>

            <div className="grid-2">
                {occasions.map(occ => (
                    <Card
                        key={occ.id}
                        variant={selected.includes(occ.id) ? 'outline' : 'glass'}
                        className={`occasion-card ${selected.includes(occ.id) ? 'selected' : ''}`}
                        onClick={() => toggle(occ.id)}
                    >
                        <div className="occ-icon">{occ.icon}</div>
                        <span>{occ.label}</span>
                        {selected.includes(occ.id) && <Check size={16} className="check-badge" />}
                    </Card>
                ))}
            </div>

            <div className="step-footer">
                <Button fullWidth onClick={onNext}>Next Step</Button>
                <Button variant="ghost" fullWidth onClick={onBack}>Back</Button>
            </div>
        </div>
    );
};

// ... Wait, I missed importing User in Occasions. Let me fix imports.
import { User } from 'lucide-react';

// Basic implementations for Season and Budget similar to above...
const StepSeason = ({ selected, onChange, onNext, onBack }: any) => (
    <div className="step-container fade-in">
        <div className="step-header"><h2>Preferred Season</h2></div>
        <div className="pill-group-vertical">
            {['Summer', 'Winter', 'Spring', 'Autumn', 'All Seasons'].map(s => (
                <div key={s} className={`pill pill-lg ${selected.includes(s) ? 'active' : ''}`} onClick={() => onChange([s])}>
                    {s}
                </div>
            ))}
        </div>
        <div className="step-footer">
            <Button fullWidth onClick={onNext}>Next Step</Button>
            <Button variant="ghost" fullWidth onClick={onBack}>Back</Button>
        </div>
    </div>
);

const StepBudget = ({ value, onChange, onFinish, onBack }: any) => (
    <div className="step-container fade-in">
        <div className="step-header">
            <h2>Your Budget</h2>
            <p>Set a comfortable range for recommendations</p>
        </div>

        <div className="budget-display">
            <span className="currency">₹</span>
            <span className="amount">{value.toLocaleString()}</span>
        </div>

        <input
            type="range" min="1000" max="100000" step="1000"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="slider"
        />

        <div className="step-footer">
            <Button fullWidth onClick={onFinish} className="btn-glow">Find My Best Look ✨</Button>
            <Button variant="ghost" fullWidth onClick={onBack}>Back</Button>
        </div>
    </div>
);

const StepProcessing = () => (
    <div className="processing-screen fade-in">
        <div className="processing-content">
            <div className="loading-ring">
                <div className="ring-inner"></div>
            </div>
            <h2 className="mt-8 text-xl font-bold">Creating Your Style Report</h2>
            <div className="processing-steps">
                <p className="step-item active">Analyzing your color profile...</p>
                <p className="step-item delayed-1">Identifying body type...</p>
                <p className="step-item delayed-2">Curating signature looks...</p>
            </div>
            <p className="text-sm text-gold mt-4">90-second magic in progress...</p>
        </div>
    </div>
);
