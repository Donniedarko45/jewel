import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
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
      // Save locally even if API fails
      setReviews(updatedReviews);
      setReviewText('');
      setReviewName('');
      setReviewRating(5);
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

  const images = product.images?.length
    ? product.images.map(img => img.url || img)
    : [product.image].filter(Boolean);

  const productPrice = typeof product.price === 'number'
    ? `₹${product.price.toLocaleString('en-IN')}`
    : product.price;

  const originalPrice = product.originalPrice
    ? `₹${product.originalPrice.toLocaleString('en-IN')}`
    : null;

  const isSale = originalPrice && product.originalPrice > product.price;
  const inStock = product.inStock !== false;
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

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

  return (
    <div className="product-detail-page">
      <NavigationBar />

      <div className="detail-container">
        <Link to="/products" className="back-button">← Back to Products</Link>

        <div className="detail-content">
          {/* Gallery */}
          <div className="detail-gallery">
            <div className="main-image-wrapper">
              {isSale && <span className="sale-badge">Sale</span>}
              <img src={images[selectedImage]} alt={product.name} className="main-image" />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-strip">
                <button className="thumb-nav prev" onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}>‹</button>
                <div className="thumbnail-list">
                  {images.map((img, index) => (
                    <div key={index} className={`thumbnail ${selectedImage === index ? 'active' : ''}`} onClick={() => setSelectedImage(index)}>
                      <img src={img} alt={`View ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="thumb-nav next" onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}>›</button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="detail-info">
            <h1 className="product-title">{product.name}</h1>

            {avgRating && (
              <div className="rating-row">
                {renderStars(Math.round(parseFloat(avgRating)))}
                <span className="review-count">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
              </div>
            )}

            <div className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? 'In stock' : 'Out of stock'}
            </div>

            <div className="price-row">
              {originalPrice && <span className="original-price">{originalPrice}</span>}
              <span className="current-price">{productPrice}</span>
            </div>

            {/* About Product - short content near price */}
            {product.aboutProduct && (
              <p className="about-product-text">{product.aboutProduct}</p>
            )}

            <div className="cart-row">
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="btn-add-to-cart" onClick={handleAddToCart} disabled={!inStock}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Tabs: Description + Reviews */}
        <div className="tabs-section">
          <div className="tabs-nav">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane reviews-pane">
                {reviews.length > 0 ? (
                  <div className="reviews-list">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="review-card">
                        <div className="review-top">
                          <div className="review-author">
                            <div className="review-avatar">{review.name.charAt(0).toUpperCase()}</div>
                            <div>
                              <span className="reviewer-name">{review.name}</span>
                              <span className="review-date">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-reviews">No reviews yet. Be the first to review this product.</p>
                )}

                <div className="review-form-wrapper">
                  <h4>Write a Review</h4>
                  <form onSubmit={handleSubmitReview} className="review-form">
                    <div className="review-form-row">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                      />
                      <div className="rating-select">
                        <span className="rating-label">Rating:</span>
                        {renderStars(reviewRating, true, setReviewRating)}
                      </div>
                    </div>
                    <textarea
                      placeholder="Share your experience with this product..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows="4"
                      required
                    />
                    <button type="submit" className="btn-submit-review">Submit Review</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
