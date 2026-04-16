import './Footer.css'

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h2 className="footer-title">WikiPaíses</h2>
                    <p>© 2026 WIKIPAÍSES THE DIGITAL CURATOR. ALL RIGHTS RESERVED.</p>
                </div>

                <nav className="footer-links">
                    <div className="footer-column">
                        <p>ABOUT THE ATLAS</p>
                    </div>
                    <div className="footer-column">
                        <p>METHODOLOGY</p>
                    </div>
                    <div className="footer-column">
                        <p>DATA SOURCES</p>
                    </div>
                    <div className="footer-column">
                        <p>PRIVACY POLICY</p>
                    </div>
                </nav>
            </div>
        </footer>
    );
}