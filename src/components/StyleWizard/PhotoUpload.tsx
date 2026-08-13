import React, { useState, useRef } from 'react';
import { Upload, Camera, User, X } from 'lucide-react';
import styles from './PhotoUpload.module.css';

interface PhotoUploadProps {
    photo: File | null;
    onPhotoChange: (photo: File | null) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoChange }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            onPhotoChange(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const clearPhoto = () => {
        onPhotoChange(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 className={styles.headerTitle}>
                    Let's Start with <span className={styles.goldText}>You</span>
                </h2>
                <p className={styles.subtitle}>
                    Upload a photo for AI-powered style analysis, or skip to enter details manually
                </p>
            </div>

            {preview ? (
                <div className={styles.previewContainer}>
                    <div className={styles.previewImageWrapper}>
                        <img
                            src={preview}
                            alt="Your photo"
                            className={styles.previewImage}
                        />
                    </div>
                    <button onClick={clearPhoto} className={styles.clearButton}>
                        <X size={20} />
                    </button>
                    <div className={styles.successText}>Photo uploaded successfully!</div>
                    <div className={styles.successSubtext}>Our AI will analyze your features</div>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        style={{ display: 'none' }}
                    />

                    <div className={styles.iconWrapper}>
                        <Upload size={40} />
                    </div>

                    <h3 className={styles.dropzoneTitle}>Drop your photo here</h3>
                    <p className={styles.dropzoneSubtitle}>or click to browse from your device</p>

                    <button
                        className={styles.btn}
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                        }}
                    >
                        <Camera size={20} /> Choose Photo
                    </button>
                </div>
            )}

            {/* Tips */}
            <div className={styles.tipsCard}>
                <h4 className={styles.tipsTitle}>
                    <User size={20} /> Photo Tips for Best Results
                </h4>
                <ul className={styles.tipsList}>
                    <li>
                        <div className={styles.tipDot} />
                        Use good lighting for accurate skin tone detection
                    </li>
                    <li>
                        <div className={styles.tipDot} />
                        Face the camera directly for best feature analysis
                    </li>
                    <li>
                        <div className={styles.tipDot} />
                        Wear minimal makeup for accurate color matching
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PhotoUpload;
