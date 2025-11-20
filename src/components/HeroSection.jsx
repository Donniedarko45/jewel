import './HeroSection.css';

const HeroSection = ({ onNavigate }) => {
  const handleExploreClick = () => {
    if (onNavigate) {
      onNavigate('products');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="brand-tag">
            <span className="brand-icon">♦</span> Shyonara
          </div>
          <h1 className="hero-headline">Our Luxury<br />Collections</h1>

          <div className="hero-actions">
            <button className="hero-cta" onClick={handleExploreClick}>Let's Get Started</button>
            <button className="hero-arrow-btn" aria-label="Next">
              →
            </button>
          </div>

          <div className="hero-description">
            <p className="desc-title"># Shyonara Jewelry Store</p>
            <p className="desc-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1573408301185-a1d315665dfb?w=800&q=80"
            alt="Woman wearing luxury jewelry"
            className="hero-main-image"
          />

          <div className="floating-card clients-card">
            <div className="client-avatars">
              <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Client" />
              <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Client" />
              <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="Client" />
              <div className="add-client">+</div>
            </div>
            <div className="client-stat">
              <span className="stat-number">230K</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

          <div className="floating-card detail-card">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=150&q=80" alt="Detail" className="detail-image" />
            <div className="detail-info">
              <h4>Beautiful In Every Detail</h4>
              <a href="#read-more">Read More →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
