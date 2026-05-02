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
          </div>

          <div className="about-content-center">
            <h2 className="about-heading">The Art Of Radiant Refinement</h2>
            <p className="about-description">
            At DIVA & Co., we create jewelry that blends modern style with lasting quality.
            From pendants to bracelets and chain bracelets each piece is made to stay radiant, always.
            </p>
        
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
