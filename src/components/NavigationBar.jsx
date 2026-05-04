import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logoImage from '../assets/logoDiva.png';
import './NavigationBar.css';

const NavigationBar = ({ showLogo = true }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { cartCount, setIsCartOpen } = useCart();

  const scrollToAbout = (e) => {
    e.preventDefault();
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
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navigation-bar">
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

        <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
          🛒
          {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
