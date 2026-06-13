import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logoImage from '../assets/logoDiva.png';
import './NavigationBar.css';

const NavigationBar = ({ showLogo = true }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    closeMobileMenu();
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate there
      window.location.href = '/#about';
    }
  };

  const scrollToFooter = (e) => {
    e.preventDefault();
    closeMobileMenu();
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navigation-bar ${currentPath === '/' ? 'home-nav' : 'inner-nav'}`}>
      <div className="nav-container">
        {showLogo ? (
          <div className="nav-logo">
            <Link to="/">
              <img src={logoImage} alt="Diva & Co." className="logo-image" />
            </Link>
          </div>
        ) : (
          <div className="nav-logo-placeholder" style={{ width: '150px' }}></div>
        )}

        <div className="nav-menu-pill">
          <ul className="nav-links">
            <li className={currentPath === '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#about" onClick={scrollToAbout}>About Us</a>
            </li>
            <li className={currentPath === '/products' ? 'active' : ''}>
              <Link to="/products">Collections</Link>
            </li>
          </ul>
          <button className="contact-btn" onClick={scrollToFooter}>Contact Us</button>
        </div>

        <div className="nav-actions">
          <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            🛒
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>

          <button 
            className="nav-hamburger-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`nav-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={closeMobileMenu} aria-label="Close menu">×</button>
        <div className="drawer-logo">
          <img src={logoImage} alt="Diva & Co." className="drawer-logo-img" />
        </div>
        <ul className="drawer-links">
          <li className={currentPath === '/' ? 'active' : ''}>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <a href="#about" onClick={scrollToAbout}>About Us</a>
          </li>
          <li className={currentPath === '/products' ? 'active' : ''}>
            <Link to="/products" onClick={closeMobileMenu}>Collections</Link>
          </li>
          <li>
            <a href="#contact" onClick={scrollToFooter}>Contact Us</a>
          </li>
        </ul>
      </div>
      <div className={`drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu} />
    </nav>
  );
};

export default NavigationBar;
