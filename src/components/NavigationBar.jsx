import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logoDiva.png';
import './NavigationBar.css';

const NavigationBar = ({ showLogo = true }) => {
  const location = useLocation();
  const currentPath = location.pathname;

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
              <a href="/#about">About Us</a>
            </li>
            <li className={currentPath === '/products' ? 'active' : ''}>
              <Link to="/products">Collections</Link>
            </li>
            <li>
              <a href="#">Pages <span className="dropdown-arrow">▼</span></a>
            </li>
          </ul>
          <button className="contact-btn">Contact Us</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
