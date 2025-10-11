import './NavigationBar.css';

const NavigationBar = ({ onNavigate }) => {
  const handleNavClick = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/" onClick={(e) => handleNavClick(e, 'home')}>LUXE</a>
        </div>
        <ul className="nav-links">
          <li><a href="#new-arrivals" onClick={(e) => handleNavClick(e, 'products')}>New Arrivals</a></li>
          <li><a href="#collections" onClick={(e) => handleNavClick(e, 'products')}>Collections</a></li>
          <li><a href="#rings" onClick={(e) => handleNavClick(e, 'products')}>Rings</a></li>
          <li><a href="#necklaces" onClick={(e) => handleNavClick(e, 'products')}>Necklaces</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'home')}>About Us</a></li>
        </ul>
        <div className="nav-icons">
          <a href="#search">🔍</a>
          <a href="#cart">🛍️</a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
