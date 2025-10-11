import './HeroSection.css';

const HeroSection = ({ onNavigate }) => {
  const handleExploreClick = () => {
    if (onNavigate) {
      onNavigate('products');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80" 
          alt="Signature necklace collection" 
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">Artistry in Every Detail</h1>
        <button className="hero-cta" onClick={handleExploreClick}>Explore Collections</button>
      </div>
    </section>
  );
};

export default HeroSection;
