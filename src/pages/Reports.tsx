import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { Download, Share2, Sparkles, X, Check } from 'lucide-react';
import stylistConsult from '../assets/stylist-consult.jpg';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Reports.css';

export const Reports: React.FC = () => {
    useDocumentTitle('Style Reports');
    // Mock Report Data
    const report = {
        identity: "Modern Minimalist with Regal Undertones",
        colors: {
            best: ['#6A0F0F', '#D4AF37', '#1A1A1A', '#F5F5F5'],
            avoid: ['#FF00FF', '#00FF00']
        },
        bodyType: "Hourglass",
        fabrics: ["Silk", "Velvet", "Structured Wool"],
        dos: ["High-waisted silhouettes", "Monochromatic layers", "Statement gold jewelry"],
        donts: ["Boxy oversized tops", "Neon palettes", "Small chaotic prints"]
    };

    return (
        <Layout wide>
            <div className="reports-page">
                {/* Report Cover */}
                <div className="report-hero">
                    <div
                        className="report-hero-media"
                        style={{ backgroundImage: `url(${stylistConsult})` }}
                    />
                    <div className="report-hero-overlay" />
                    <div className="report-hero-content">
                        <span className="report-eyebrow">Style Dossier</span>
                        <h1 className="report-title">{report.identity}</h1>
                        <div className="report-meta-row">
                            <span>Generated Jan 22, 2026</span>
                            <span className="divider-dot">•</span>
                            <span>{report.bodyType} Silhouette</span>
                        </div>
                    </div>
                </div>

                <div className="reports-body">
                    {/* Signature Style Identity */}
                    <Card variant="glass" className="identity-card">
                        <div className="identity-badge">
                            <Sparkles size={14} />
                            <span>Signature Style Identity</span>
                        </div>
                        <h2 className="identity-text">{report.identity}</h2>
                        <p className="identity-desc">
                            Your style balances contemporary clean lines with luxurious, heritage-inspired details. You shine in structured silhouettes that honor your proportions.
                        </p>
                    </Card>

                    {/* Color Analysis */}
                    <div className="report-section">
                        <SectionHeader title="Color Analysis" icon="Sun" />
                        <Card variant="solid" className="p-4">
                            <h4 className="subsection-title">Power Colors</h4>
                            <div className="swatch-row mb-4">
                                {report.colors.best.map(c => (
                                    <div key={c} className="swatch-item">
                                        <div className="color-swatch-lg" style={{ background: c }} />
                                        <span className="swatch-hex">{c.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>

                            <h4 className="subsection-title text-muted">Colors to Avoid</h4>
                            <div className="swatch-row avoid-row">
                                {report.colors.avoid.map(c => (
                                    <div key={c} className="swatch-item">
                                        <div className="color-swatch-sm" style={{ background: c }}>
                                            <X size={11} aria-hidden="true" />
                                        </div>
                                        <span className="swatch-hex muted">{c.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Dos and Donts */}
                    <div className="report-section">
                        <SectionHeader title="Styling Guidance" icon="Briefcase" />
                        <div className="dossier-grid">
                            <Card variant="glass" className="dossier-col dossier-col-good">
                                <h4 className="col-header good">
                                    <Check size={16} aria-hidden="true" /> Best For You
                                </h4>
                                <ul className="dossier-list">
                                    {report.dos.map(item => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </Card>
                            <Card variant="solid" className="dossier-col">
                                <h4 className="col-header bad">
                                    <X size={16} aria-hidden="true" /> Avoid
                                </h4>
                                <ul className="dossier-list dimmed">
                                    {report.donts.map(item => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>

                    {/* Fabrics */}
                    <div className="report-section">
                        <SectionHeader title="Ideal Fabrics" icon="Heart" />
                        <div className="fabric-scroll">
                            {report.fabrics.map(f => (
                                <div key={f} className="fabric-pill">{f}</div>
                            ))}
                        </div>
                    </div>

                    <div className="report-actions">
                        <Button variant="primary" fullWidth leftIcon={<Download size={18} />}>
                            Download PDF Report
                        </Button>
                        <Button variant="outline" fullWidth className="mt-4" leftIcon={<Share2 size={18} />}>
                            Share Profile
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
