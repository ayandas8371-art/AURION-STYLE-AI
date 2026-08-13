import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { Download, Share2, Sparkles, X, Check } from 'lucide-react';
import stylistConsult from '../assets/stylist-consult.jpg';
import './Reports.css';

export const Reports: React.FC = () => {
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
        <Layout>
            <div className="reports-page">
                <div
                    className="report-hero mb-6"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${stylistConsult})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '2rem',
                        borderRadius: '0 0 24px 24px',
                        minHeight: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <h1 className="report-title text-3xl font-serif text-white mb-1">Style Dossier</h1>
                    <p className="report-date text-gray-300 text-sm">Generated Jan 22, 2026</p>
                </div>

                {/* Identity Card */}
                <Card variant="glass" className="identity-card mb-8">
                    <div className="identity-badge">
                        <Sparkles size={14} className="text-black" />
                        <span>Signature Style Identity</span>
                    </div>
                    <h2 className="identity-text">{report.identity}</h2>
                    <p className="identity-desc">
                        Your style balances contemporary clean lines with luxurious, heritage-inspired details. You shine in structured silhouettes that honor your proportions.
                    </p>
                </Card>

                {/* Color Analysis */}
                <div className="section mb-8">
                    <SectionHeader title="Color Analysis" icon="Sun" />
                    <Card variant="solid" className="p-4">
                        <h4 className="subsection-title">Power Colors</h4>
                        <div className="color-grid mb-4">
                            {report.colors.best.map(c => (
                                <div key={c} className="color-swatch-lg" style={{ background: c }}></div>
                            ))}
                        </div>

                        <h4 className="subsection-title text-muted">Colors to Avoid</h4>
                        <div className="color-grid">
                            {report.colors.avoid.map(c => (
                                <div key={c} className="color-swatch-sm" style={{ background: c, opacity: 0.5 }}>
                                    <X size={12} className="text-white" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Dos and Donts */}
                <div className="section mb-8">
                    <SectionHeader title="Styling Guidance" icon="Briefcase" />
                    <div className="dossier-grid">
                        <Card variant="glass" className="dossier-col">
                            <h4 className="col-header good">
                                <Check size={16} /> Best For You
                            </h4>
                            <ul className="dossier-list">
                                {report.dos.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </Card>
                        <Card variant="solid" className="dossier-col">
                            <h4 className="col-header bad">
                                <X size={16} /> Avoid
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
                <div className="section mb-8">
                    <SectionHeader title="Ideal Fabrics" icon="Heart" />
                    <div className="fabric-scroll">
                        {report.fabrics.map(f => (
                            <div key={f} className="fabric-pill">{f}</div>
                        ))}
                    </div>
                </div>

                <div className="report-actions">
                    <Button variant="primary" fullWidth leftIcon={<Download size={18} />}>Download PDF Report</Button>
                    <Button variant="outline" fullWidth className="mt-4" leftIcon={<Share2 size={18} />}>Share Profile</Button>
                </div>

            </div>
        </Layout>
    );
};
