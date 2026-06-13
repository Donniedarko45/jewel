import { Link, useNavigate } from 'react-router-dom';
import './HeroSection.css';
import logoDiva from '../assets/logoDiva.png';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products');
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-glass-card">
            <div className="glass-content">
              <h1 className="hero-headline">Anti-Tarnish Jewelry <br />Crafted to Shine Every Day</h1>

              <div className="hero-actions">
                <button className="hero-cta" onClick={handleExploreClick}>Shop the Collection</button>
                <button className="hero-arrow-btn" aria-label="Next">
                  →
                </button>
              </div>

              <div className="hero-description">
                <p className="desc-text">
                  At DIVA & Co., we create jewelry that blends modern style with lasting quality.
                  From pendants to bracelets and chain bracelets—each piece is made to stay radiant, always.
                </p>
              </div>
            </div>

            <div className="hero-floating-elements">
              <div className="trust-badge-card">
                <div className="trust-badge-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#D4A574" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                    <polyline points="2 15.5 12 8.5 22 15.5" />
                    <line x1="12" y1="2" x2="12" y2="8.5" />
                  </svg>
                </div>
                <div className="trust-badge-info">
                  <h4>Anti-Tarnish Plating</h4>
                  <p>Guaranteed everyday shine & sweatproof defense</p>
                </div>
              </div>

              <div className="trust-badge-card">
                <div className="trust-badge-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#D4A574" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="trust-badge-info">
                  <h4>1-Year Warranty</h4>
                  <p>Premium anti-tarnish plating assurance</p>
                </div>
              </div>

              <div className="trust-badge-card">
                <div className="trust-badge-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#D4A574" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="trust-badge-info">
                  <h4>Free Express Shipping</h4>
                  <p>Fast, safe & fully insured home delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
