import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-logo">LUXE</h3>
            <p className="footer-description">
              Crafting timeless elegance through exceptional jewelry design and unparalleled craftsmanship.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📌</a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><a href="#new-arrivals">New Arrivals</a></li>
              <li><a href="#rings">Rings</a></li>
              <li><a href="#necklaces">Necklaces</a></li>
              <li><a href="#earrings">Earrings</a></li>
              <li><a href="#bracelets">Bracelets</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#sizing">Size Guide</a></li>
              <li><a href="#care">Jewelry Care</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-links">
              <li><a href="#about">Our Story</a></li>
              <li><a href="#craftsmanship">Craftsmanship</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="newsletter-text">Subscribe to receive exclusive offers and updates</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 LUXE Jewelry. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
