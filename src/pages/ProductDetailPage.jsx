import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import './ProductDetailPage.css';

const ProductDetailPage = ({ product, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const images = [
    product.image,
    product.secondaryImage,
    product.image
  ].filter(Boolean);

  return (
    <div className="product-detail-page">
      <NavigationBar onNavigate={onNavigate} />
      
      <div className="detail-container">
        <button className="back-button" onClick={() => onNavigate('products')}>
          ← Back to Products
        </button>

        <div className="detail-content">
          <div className="detail-gallery">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.title} />
            </div>
            <div className="thumbnail-list">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{product.title}</h1>
            <div className="detail-price">{product.price}</div>
            
            <div className="detail-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-text">(128 reviews)</span>
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>
                Exquisitely crafted with attention to every detail, this {product.title.toLowerCase()} 
                represents the pinnacle of luxury jewelry design. Each piece is meticulously handcrafted 
                by master artisans using only the finest materials.
              </p>
              <p>
                Perfect for special occasions or as an everyday statement piece, this jewelry combines 
                timeless elegance with contemporary sophistication.
              </p>
            </div>

            <div className="detail-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Handcrafted by expert artisans</li>
                <li>Comes with certificate of authenticity</li>
                <li>Lifetime warranty included</li>
                <li>Complimentary gift packaging</li>
              </ul>
            </div>

            <div className="detail-specifications">
              <h3>Specifications</h3>
              <div className="spec-grid">
                <div className="spec-item">
                  <span className="spec-label">Material:</span>
                  <span className="spec-value">18K Gold</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Stone:</span>
                  <span className="spec-value">Natural Diamond</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Weight:</span>
                  <span className="spec-value">3.5g</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Origin:</span>
                  <span className="spec-value">Italy</span>
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-add-cart">
                  <span>Add to Cart</span>
                </button>
                <button className="btn-buy-now">
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            <div className="detail-delivery">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders over $500</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">🔒</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
