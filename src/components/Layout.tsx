import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, Shirt, FileText, User } from 'lucide-react';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
    return (
        <div className="app-container">
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

    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Search, label: 'Explore', path: '/explore' },
        { icon: Shirt, label: 'Closet', path: '/closet' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

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
