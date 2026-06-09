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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
