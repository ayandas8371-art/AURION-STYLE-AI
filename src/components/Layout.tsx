import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, Shirt, FileText, User, Sparkles } from 'lucide-react';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    showNav?: boolean;
    /** Opt-in: lets the page grow into a proper desktop composition (wide
     * container + top nav) at desktop widths instead of staying pinned to
     * the mobile app-shell width. Used by the primary app pages only —
     * auth/onboarding-style screens keep the centered mobile-width card
     * look on desktop, which is already the correct pattern for them. */
    wide?: boolean;
}

const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Shirt, label: 'Closet', path: '/closet' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: User, label: 'Profile', path: '/profile' },
];

export const Layout: React.FC<LayoutProps> = ({ children, showNav = true, wide = false }) => {
    return (
        <div className={`app-container${wide ? ' app-container--wide' : ''}`}>
            {showNav && wide && <DesktopNav />}
            <main className="app-content">
                {children}
            </main>
            {showNav && <BottomNav />}
        </div>
    );
};

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                    <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 1.5} />
                    <span className="nav-label">{item.label}</span>
                    {isActive(item.path) && <span className="nav-indicator" />}
                </Link>
            ))}
        </nav>
    );
};

// Desktop-only top navigation. Always rendered (when `wide`) so behavior is
// pure CSS-driven responsiveness — no JS viewport/user-agent detection. It
// stays hidden via `display: none` below the desktop breakpoint.
const DesktopNav = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="desktop-nav">
            <Link to="/home" className="desktop-nav-brand">
                <Sparkles size={20} strokeWidth={1.5} />
                <span>AURION <span className="brand-accent">AI</span></span>
            </Link>
            <div className="desktop-nav-links">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`desktop-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                        <item.icon size={17} strokeWidth={isActive(item.path) ? 2.25 : 1.5} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};
