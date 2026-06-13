import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { productApi } from '../services/api.js';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [lensStyle, setLensStyle] = useState({ display: 'none' });

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productApi.getById(productId);
      if (response.success) {
        setProduct(response.data);
        setReviews(response.data.reviews || []);
      }
    } catch (err) {
      console.log('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    const newReview = {
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewText.trim(),
      date: new Date().toISOString()
    };

    const updatedReviews = [...reviews, newReview];

    try {
      const response = await productApi.addReview(productId, newReview);
      if (response.success) {
        setReviews(response.data.reviews || updatedReviews);
      } else {
        setReviews(updatedReviews);
      }
      setReviewText('');
      setReviewName('');
      setReviewRating(5);
    } catch {
      setReviews(updatedReviews);
      setReviewText('');
      setReviewName('');
      setReviewRating(5);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Lens cursor placement
    const lensWidth = 120;
    const lensHeight = 120;
    let lensX = e.clientX - left - lensWidth / 2;
    let lensY = e.clientY - top - lensHeight / 2;

    // Boundary check for lens
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > width - lensWidth) lensX = width - lensWidth;
    if (lensY > height - lensHeight) lensY = height - lensHeight;

    setIsZooming(true);
    setLensStyle({
      display: 'block',
      left: `${lensX}px`,
      top: `${lensY}px`,
      width: `${lensWidth}px`,
      height: `${lensHeight}px`
    });

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${images[selectedImage]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%' // Zoom factor
    });
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ display: 'none' });
    setLensStyle({ display: 'none' });
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setDeliveryMessage('❌ Invalid PIN Code. Please enter a valid 6-digit number.');
      return;
    }

    const firstDigit = parseInt(pincode.charAt(0));
    const days = (firstDigit % 3) + 2; // Dynamic estimation
    const date = new Date();
    date.setDate(date.getDate() + days);
    const dateString = date.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });

    setDeliveryMessage(`🚚 Delivery available! Expected by ${dateString} (${days} days) | Cash on Delivery available.`);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <NavigationBar />
        <div className="detail-container">
          <div className="loading-state">Loading product details...</div>
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

  const images = product.images?.length
    ? product.images.map(img => img.url || img)
    : [product.image].filter(Boolean);

  // Derive original price markup and discount percentage if missing
  const calculatedOriginalPrice = product.originalPrice || Math.round(product.price * 1.4);
  const discountPercentage = Math.round(((calculatedOriginalPrice - product.price) / calculatedOriginalPrice) * 100);

  const displayPrice = `₹${product.price.toLocaleString('en-IN')}`;
  const displayOriginalPrice = `₹${calculatedOriginalPrice.toLocaleString('en-IN')}`;

  const inStock = product.inStock !== undefined ? product.inStock : (product.quantity > 0);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    // addToCart automatically opens the CartSidebar with the WhatsApp checkout modal trigger
  };

  const getSpecs = () => {
    // If the description contains key-value pairs, let's extract them to display real specs
    const lines = product.description ? product.description.split('\n').map(l => l.trim()).filter(Boolean) : [];
    const keyValueLines = lines.map(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        return {
          label: line.substring(0, colonIndex).trim(),
          value: line.substring(colonIndex + 1).trim()
        };
      }
      return null;
    }).filter(Boolean);

    // If we have parsed specs from the description, use them!
    if (keyValueLines.length > 0) {
      return keyValueLines;
    }

    // Otherwise, fall back to the dynamic default generator
    const isGold = product.name?.toLowerCase().includes('gold') || product.description?.toLowerCase().includes('gold');
    const isRose = product.name?.toLowerCase().includes('rose') || product.description?.toLowerCase().includes('rose');
    const isSilver = product.name?.toLowerCase().includes('silver') || product.description?.toLowerCase().includes('silver');

    let material = '18K Yellow Gold Plated Brass';
    let color = 'Gold';

    if (isRose) {
      material = '18K Rose Gold Plated Brass';
      color = 'Rose Gold';
    } else if (isSilver) {
      material = '925 Sterling Silver';
      color = 'Silver';
    } else if (isGold) {
      material = '18K Yellow Gold Plated Brass';
      color = 'Gold';
    }

    return [
      { label: 'Material', value: material },
      { label: 'Color', value: color },
      { label: 'Finish', value: 'High Polish Mirror Finish' },
      { label: 'Weight', value: product.type === 'bracelet' ? '7.2 g' : '4.6 g' },
      { label: 'Warranty', value: '1-Year Anti-Tarnish Warranty' },
      { label: 'Care Instructions', value: 'Avoid contact with chemicals, water, and perfume. Clean with dry soft cloth.' }
    ];
  };

  const specsList = getSpecs();

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderDetailedDescription = () => {
    if (!product.description) return null;

    const lines = product.description.split('\n').map(l => l.trim()).filter(Boolean);
    
    // Check if the majority of lines follow "Key: Value" format
    const keyValueLines = lines.map(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        return {
          key: line.substring(0, colonIndex).trim(),
          value: line.substring(colonIndex + 1).trim()
        };
      }
      return null;
    }).filter(Boolean);

    // If it's a structured key-value list
    if (keyValueLines.length > 0 && keyValueLines.length >= lines.length - 1) {
      // Define a map of key names to icons
      const getIcon = (keyName) => {
        const lower = keyName.toLowerCase();
        if (lower.includes('material')) {
          return (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          );
        }
        if (lower.includes('finish') || lower.includes('plating')) {
          return (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M2 12h20M12 2v20" />
            </svg>
          );
        }
        if (lower.includes('style') || lower.includes('trend')) {
          return (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        }
        if (lower.includes('design') || lower.includes('cuff')) {
          return (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          );
        }
        if (lower.includes('ideal') || lower.includes('for') || lower.includes('gender')) {
          return (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          );
        }
        if (lower.includes('occasion')) {
          return (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          );
        }
        // Fallback generic star icon
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#B89B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        );
      };

      return (
        <div className="premium-desc-container">
          <div className="premium-desc-header">
            <h3>Craftsmanship & Specifications</h3>
            <p>Every piece at DIVA & Co. is designed with high precision, balancing timeless luxury with everyday longevity.</p>
          </div>
          <div className="premium-desc-grid">
            {keyValueLines.map((line, index) => (
              <div key={index} className="premium-desc-card">
                <div className="premium-desc-icon-box">
                  {getIcon(line.key)}
                </div>
                <div className="premium-desc-info">
                  <span className="premium-desc-key">{line.key}</span>
                  <span className="premium-desc-val">{line.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Otherwise render as elegant paragraph
    return (
      <div className="premium-desc-plain-wrapper">
        <p className="premium-desc-plain-text">{product.description}</p>
      </div>
    );
  };

  return (
    <div className="product-detail-page">
      <NavigationBar />

      <div className="detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/products">Collections</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="detail-content-grid">
          {/* LEFT COLUMN: Gallery */}
          <div className="detail-gallery-sticky">
            <div className="gallery-layout-wrapper">
              {/* Vertical thumbnail list */}
              {images.length > 1 && (
                <div className="vertical-thumbnail-strip">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`vertical-thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      onMouseEnter={() => setSelectedImage(index)}
                    >
                      <img src={img} alt={`View ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* Main Image Viewport */}
              <div
                className="main-image-viewport"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {discountPercentage > 0 && <span className="discount-tag-badge">{discountPercentage}% OFF</span>}
                <img src={images[selectedImage]} alt={product.name} className="main-image" />
                
                {/* Magnification Lens */}
                <div className="zoom-lens-element" style={lensStyle} />
              </div>
            </div>
            
            {/* Magnifier result panel (floats contextually) */}
            <div className="zoom-magnifier-result" style={zoomStyle} />
          </div>

          {/* RIGHT COLUMN: Info details */}
          <div className="detail-info-pane">
            <div className="brand-badge">DIVA & CO.</div>
            <h1 className="product-title-heading">{product.name}</h1>

            {/* Ratings & Stock Status Row */}
            <div className="ratings-status-row">
              {avgRating ? (
                <div className="rating-pill">
                  <span>{avgRating}</span>
                  <span className="star-char">★</span>
                </div>
              ) : (
                <div className="rating-pill unrated">
                  <span>New</span>
                </div>
              )}
              <span className="review-pill-count">
                {reviews.length} {reviews.length === 1 ? 'Customer Review' : 'Customer Reviews'}
              </span>
              <div className={`stock-status-pill ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            {/* Price Block */}
            <div className="price-block-card">
              <span className="current-price-tag">{displayPrice}</span>
              <span className="original-price-tag">{displayOriginalPrice}</span>
              <span className="discount-percent-tag">{discountPercentage}% off</span>
            </div>

            {/* Short Description snippet */}
            {product.aboutProduct && (
              <div className="short-desc-highlight">
                <p>{product.aboutProduct}</p>
              </div>
            )}

            {/* Quantity Controls */}
            {inStock && (
              <div className="quantity-selection-wrapper">
                <span className="qty-label">Quantity:</span>
                <div className="quantity-selector-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
                  <span className="qty-count-val">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="purchase-actions-container">
              <button
                className="btn-buy-now-primary"
                onClick={handleBuyNow}
                disabled={!inStock}
              >
                BUY NOW (ORDER VIA WHATSAPP 💬)
              </button>
              <button
                className="btn-add-to-cart-secondary"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                ADD TO CART
              </button>
            </div>

            {/* Pincode & Delivery Checker */}
            <div className="pincode-checker-block">
              <h3>Delivery & Services</h3>
              <form onSubmit={handlePincodeCheck} className="pincode-input-group">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN Code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
                <button type="submit">Check</button>
              </form>
              {deliveryMessage && <p className="delivery-status-note">{deliveryMessage}</p>}
              <div className="service-features-list">
                <span>✓ 7 Days Easy Returns Placed via Chat</span>
                <span>✓ Lifetime Quality Guarantee on Anti-Tarnish plating</span>
              </div>
            </div>

            {/* Specifications Details Grid */}
            <div className="specifications-details-card">
              <h3>Specifications & Details</h3>
              <div className="specs-table-grid">
                {specsList.map((spec, index) => (
                  <div key={index} className="specs-row-item">
                    <span className="spec-label-name">{spec.label}</span>
                    <span className="spec-value-detail">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights bullet points */}
            <div className="product-highlights-box">
              <h3>Product Highlights</h3>
              <ul className="highlights-bullet-points">
                <li>Anti-Tarnish technology guarantees long-lasting everyday shine.</li>
                <li>Hypoallergenic, skin-friendly material suitable for sensitive skin.</li>
                <li>Perfect gift selection including premium Diva & Co. signature jewelry boxes.</li>
                <li>Elegant minimal structure that fits seamlessly from formal to casual occasions.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Tabs Section: Full Description + Review list */}
        <div className="tabs-description-reviews-section">
          <div className="details-tab-nav-bar">
            <button
              className={`details-tab-header-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Detailed Description
            </button>
            <button
              className={`details-tab-header-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          <div className="details-tab-pane-content">
            {activeTab === 'description' && (
              <div className="description-pane-content">
                {renderDetailedDescription()}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-pane-content">
                {reviews.length > 0 ? (
                  <div className="pdp-reviews-list">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="pdp-review-card-item">
                        <div className="pdp-review-card-header">
                          <div className="reviewer-profile-info">
                            <div className="reviewer-avatar-char">{review.name.charAt(0).toUpperCase()}</div>
                            <div>
                              <span className="reviewer-name-label">{review.name}</span>
                              <span className="reviewer-date-stamp">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <p className="pdp-reviewer-comment-text">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-reviews-tagline">No reviews yet. Be the first to share your thoughts on this product!</p>
                )}

                <div className="write-review-pdp-form">
                  <h3>Submit a Product Review</h3>
                  <form onSubmit={handleSubmitReview} className="review-input-form">
                    <div className="form-double-row-inputs">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                      />
                      <div className="pdp-rating-input-selector">
                        <span>Rating:</span>
                        {renderStars(reviewRating, true, setReviewRating)}
                      </div>
                    </div>
                    <textarea
                      placeholder="Write your detailed product experience here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows="4"
                      required
                    />
                    <button type="submit" className="btn-pdp-submit-review">Publish Review</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetailPage;
