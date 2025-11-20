import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-image-left">
            <img
              src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?w=600&q=80"
              alt="Woman with sunglasses"
            />
            <div className="rating-badge">
              <span>★★★★★ (5/5)</span>
            </div>
          </div>

          <div className="about-content-center">
            <h2 className="about-heading">The Art Of Radiant Refinement</h2>
            <p className="about-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
            </p>
            <button className="learn-more-btn">Learn More</button>
          </div>

          <div className="about-image-right">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
              alt="Jewelry detail"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
