import { Link } from 'react-router-dom';
import './Header.css'

export default function Header() {
    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="logo-link">
                    <h1 className="atlas-title">WikiPaíses</h1>
                </Link>

                <nav className="header-nav">
                    <span>Europe</span>
                    <span>Americas</span>
                    <span>Asia</span>
                    <span>Africa</span>
                    <span>Oceania</span>
                </nav>

                <div className="header-icons">
                    <span>🌐</span>
                    <span>👤</span>
                </div>
            </div>
        </header>
    );
}