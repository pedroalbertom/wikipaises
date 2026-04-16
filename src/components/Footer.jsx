import './Footer.css'

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h2 className="atlas-title">WikiPaíses</h2>
                    <p>© 2026 WIKIPAÍSES THE DIGITAL CURATOR. ALL RIGHTS RESERVED.</p>
                </div>

                <nav className="footer-links">
                    <div className="footer-column">
                        <h4>ABOUT THE ATLAS</h4>
                        <p>METHODOLOGY</p>
                    </div>
                    <div className="footer-column">
                        <h4>DATA SOURCES</h4>
                        <p>PRIVACY POLICY</p>
                    </div>
                </nav>
            </div>
        </footer>
    );
}