import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { productApi } from '../services/api.js';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Fallback products for demo when backend is offline
  const fallbackProducts = {
    '1': {
      id: '1',
      title: 'Classic Diamond Bracelet',
      price: 2499,
      originalPrice: 2999,
      type: 'bracelet',
      description: 'Exquisitely crafted diamond bracelet featuring premium quality materials and expert artisan craftsmanship.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'
    },
    '2': {
      id: '2',
      title: 'Gold Chain Pendant',
      price: 899,
      type: 'pendant',
      description: 'Elegant gold chain pendant perfect for special occasions or everyday wear.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'
    },
    '3': {
      id: '3',
      title: 'Emerald Gold Bracelet',
      price: 3199,
      type: 'bracelet',
      description: 'Stunning emerald and gold bracelet combining timeless elegance with contemporary design.',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    },
    '4': {
      id: '4',
      title: 'Sapphire Pendant',
      price: 1899,
      originalPrice: 2299,
      type: 'pendant',
      description: 'Beautiful sapphire pendant with intricate detailing and premium finish.',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80'
    },
    '5': {
      id: '5',
      title: 'Diamond Tennis Bracelet',
      price: 4299,
      type: 'bracelet',
      description: 'Classic diamond tennis bracelet featuring brilliant cut diamonds in a timeless design.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'
    },
    '6': {
      id: '6',
      title: 'Pearl Drop Pendant',
      price: 1199,
      type: 'pendant',
      description: 'Elegant pearl drop pendant with sterling silver chain and lustrous pearl.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productApi.getById(productId);

      if (response.success) {
        setProduct(response.data);
      } else {
        // Use fallback product
        const fallback = fallbackProducts[productId];
        if (fallback) {
          setProduct(fallback);
        }
      }
    } catch (err) {
      console.log('Using fallback product - backend may not be running');
      const fallback = fallbackProducts[productId];
      if (fallback) {
        setProduct(fallback);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <NavigationBar />
        <div className="detail-container">
          <div className="loading-state">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <NavigationBar />
        <div className="detail-container">
          <div className="error-state">
            <h2>Product not found</h2>
            <Link to="/products" className="back-link">← Back to Products</Link>
          </div>
        </div>
      </div>
    );
  }

  // Support both static data and API data formats
  const images = product.images?.length
    ? product.images.map(img => img.url || img)
    : [product.image, product.secondaryImage, product.image].filter(Boolean);

  const productPrice = typeof product.price === 'number'
    ? `$${product.price.toLocaleString()}`
    : product.price;

  const originalPrice = product.originalPrice
    ? `$${product.originalPrice.toLocaleString()}`
    : null;

  const isSale = originalPrice && product.originalPrice > product.price;
  const inStock = product.inStock !== false;

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'additional', label: 'Additional Info' },
    { id: 'reviews', label: 'Reviews (1)' },
    { id: 'vendor', label: 'Vendor Info' },
    { id: 'custom', label: 'Custom Tabs' }
  ];

  return (
    <div className="product-detail-page">
      <NavigationBar />

      <div className="detail-container">
        <Link to="/products" className="back-button">
          ← Back to Products
        </Link>

        <div className="detail-content">
          {/* Gallery Section */}
          <div className="detail-gallery">
            <div className="main-image-wrapper">
              {isSale && <span className="sale-badge">Sale</span>}
              <img
                src={images[selectedImage]}
                alt={product.title || product.name}
                className="main-image"
              />
            </div>
            <div className="thumbnail-strip">
              <button className="thumb-nav prev" onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}>
                ‹
              </button>
              <div className="thumbnail-list">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
              <button className="thumb-nav next" onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}>
                ›
              </button>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="detail-info">
            <h1 className="product-title">{product.title || product.name}</h1>

            <div className="rating-row">
              <div className="stars">★★★★★</div>
              <a href="#reviews" className="review-link">✎ 1 Review</a>
            </div>

            <div className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? 'In stock' : 'Out of stock'}
            </div>

            <div className="price-row">
              {originalPrice && <span className="original-price">{originalPrice}</span>}
              <span className="current-price">{productPrice}</span>
            </div>

            <p className="short-description">
              {product.description ||
                `Lorem ipsum dolor sit amet, fougiat delicata issorsh quo malorum intellegebat, liber regione eu viulpit, Integre, vide viderer elafend ex mea. His at shares.`}
            </p>
            <a href="#description" className="read-more">Read more ⊕</a>

            <div className="quantity-row">
              <span className="qty-label">QUANTITY:</span>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="action-row">
              <button className="btn-add-to-cart">
                <span className="cart-icon">🛒</span>
                ADD TO CART
              </button>
              <button className="btn-wishlist" title="Add to wishlist">♡</button>
              <button className="btn-compare" title="Compare">⟲</button>
            </div>

            <div className="social-row">
              <button className="social-btn twitter">🐦 Tweet</button>
              <button className="social-btn facebook">f Share</button>
              <button className="social-btn google">G+ Google+</button>
              <button className="social-btn pinterest">📌 Pin real</button>
            </div>

            <button className="btn-size-chart">
              ☰ Size Chart
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="tabs-section">
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>Product Description</h3>
                <p>
                  {product.description ||
                    `Exquisitely crafted with attention to every detail, this ${(product.title || product.name || 'piece').toLowerCase()} 
                    represents the pinnacle of luxury jewelry design. Each piece is meticulously handcrafted 
                    by master artisans using only the finest materials.`}
                </p>
                <p>
                  Perfect for special occasions or as an everyday statement piece, this jewelry combines
                  timeless elegance with contemporary sophistication.
                </p>
                <h4>Features</h4>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Handcrafted by expert artisans</li>
                  <li>Comes with certificate of authenticity</li>
                  <li>Lifetime warranty included</li>
                  <li>Complimentary gift packaging</li>
                </ul>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="tab-pane">
                <h3>Additional Information</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Material</td>
                      <td>18K Gold</td>
                    </tr>
                    <tr>
                      <td>Stone</td>
                      <td>Natural Diamond</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>3.5g</td>
                    </tr>
                    <tr>
                      <td>Origin</td>
                      <td>Italy</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{product.type ? product.type.charAt(0).toUpperCase() + product.type.slice(1) : 'Jewelry'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <h3>Customer Reviews</h3>
                <div className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">Sarah M.</span>
                    <span className="review-date">January 15, 2026</span>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <p>Absolutely stunning piece! The craftsmanship is exceptional and it looks even better in person. Highly recommend!</p>
                </div>
              </div>
            )}

            {activeTab === 'vendor' && (
              <div className="tab-pane">
                <h3>Vendor Information</h3>
                <p><strong>Store Name:</strong> Diva & Co. Luxury Boutique</p>
                <p><strong>Location:</strong> New York, USA</p>
                <p><strong>Rating:</strong> ★★★★★ (5.0)</p>
                <p>Trusted seller with 10+ years of experience in luxury jewelry.</p>
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="tab-pane">
                <h3>Care Instructions</h3>
                <p>To maintain the beauty of your jewelry:</p>
                <ul>
                  <li>Store in a cool, dry place</li>
                  <li>Avoid contact with perfumes and chemicals</li>
                  <li>Clean with a soft cloth</li>
                  <li>Remove before swimming or bathing</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
