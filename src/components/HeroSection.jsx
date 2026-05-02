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
        <div className="hero-navbar-container">
          <div className='logo-container'>
            <Link to="/" className="logo-link">
              <img src={logoDiva} alt="Diva & Co." className="logo-image" width={200} height={80} />
            </Link>
          </div>
          <div className="hero-navbar">
            <div className="hero-nav-menu-pill">
              <ul className="hero-nav-links">
                <li className="active"><Link to="/">Home</Link></li>
                <li><a href="#about">About Us</a></li>
                <li><Link to="/products">Collections</Link></li>
                <li><a href="#">Pages <span className="dropdown-arrow">▼</span></a></li>
              </ul>
              <button className="hero-contact-btn">Contact Us</button>
            </div>
          </div>
        </div>
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
