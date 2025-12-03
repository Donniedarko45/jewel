import './HeroSection.css';
import jewelryBackground from '../assets/jewel-bg.png';
import bgStats from '../assets/bgStats.jpg';
const HeroSection = ({ onNavigate }) => {
  const handleExploreClick = () => {
    if (onNavigate) {
      onNavigate('products');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background-image">
        <img
          src={jewelryBackground}
          alt="Jewelry Background"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-glass-card">
         

          <div className="hero-navbar">
            <div className="hero-nav-menu-pill">
              <ul className="hero-nav-links">
                <li className="active"><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); }}>About Us</a></li>
                <li><a href="#collections" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>Collections</a></li>
                <li><a href="#pages">Pages <span className="dropdown-arrow">▼</span></a></li>
              </ul>
              <button className="hero-contact-btn">Contact Us</button>
            </div>
          </div>

          <div className="glass-content">
            <div className="brand-tag">
              <span className="brand-icon">♦</span> Shimmer
            </div>

            <h1 className="hero-headline">Our Luxury<br />Collections</h1>

            <div className="hero-actions">
              <button className="hero-cta" onClick={handleExploreClick}>Let's Get Started</button>
              <button className="hero-arrow-btn" aria-label="Next">
                →
              </button>
            </div>

            <div className="hero-description">
              <p className="desc-title">// Shimmer Jewelry Store</p>
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
  );
};

export default HeroSection;
