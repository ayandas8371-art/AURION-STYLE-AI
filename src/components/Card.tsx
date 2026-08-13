import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'glass' | 'solid' | 'outline';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'glass',
    padding = 'md',
    ...props
}) => {
    return (
        <div
            className={`card card-${variant} card-p-${padding} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
