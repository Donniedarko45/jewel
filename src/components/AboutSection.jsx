import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-heading">Crafting Timeless Elegance</h2>
            <p className="about-description">
              For over three decades, LUXE has been at the forefront of luxury jewelry design. 
              Our master artisans combine traditional craftsmanship with contemporary aesthetics 
              to create pieces that transcend time.
            </p>
            <p className="about-description">
              Each piece in our collection tells a story of dedication, precision, and artistry. 
              We source only the finest materials from around the world, ensuring that every 
              creation meets our exacting standards of excellence.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3 className="stat-number">30+</h3>
                <p className="stat-label">Years of Excellence</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">50K+</h3>
                <p className="stat-label">Happy Customers</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">100%</h3>
                <p className="stat-label">Authentic Materials</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80" 
              alt="Jewelry craftsmanship" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
