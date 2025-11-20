import './NavigationBar.css';

const NavigationBar = ({ onNavigate, showLogo = true }) => {
  const handleNavClick = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        {showLogo ? (
          <div className="nav-logo">
            <div className="logo-icon">♦</div>
            <a href="/" onClick={(e) => handleNavClick(e, 'home')}>Shimmer</a>
          </div>
        ) : (
          <div className="nav-logo-placeholder" style={{ width: '150px' }}></div>
        )}

        <div className="nav-menu-pill">
          <ul className="nav-links">
            <li className="active"><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'home')}>About Us</a></li>
            <li><a href="#collections" onClick={(e) => handleNavClick(e, 'products')}>Collections</a></li>
            <li><a href="#pages">Pages <span className="dropdown-arrow">▼</span></a></li>
          </ul>
          <button className="contact-btn">Contact Us</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
