import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { productApi } from '../services/api.js';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState(25000); // Increased max range for luxury items
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchProducts();

    const handleOutsideClick = () => {
      setShowSortDropdown(false);
      setShowPriceDropdown(false);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll();

      if (response.success && response.data.length > 0) {
        const transformedProducts = response.data.map(product => ({
          id: product._id,
          title: product.name,
          price: `₹${product.price.toLocaleString('en-IN')}`,
          numericPrice: product.price,
          type: product.type,
          image: product.images?.[0]?.url || 'https://via.placeholder.com/500',
          secondaryImage: product.images?.[1]?.url || product.images?.[0]?.url,
          ...product
        }));
        setProducts(transformedProducts);
      }
    } catch (err) {
      console.log('Failed to fetch products');
    } finally {
      // Small timeout for smooth staggered entrance effect
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };

  // Apply all filters
  let filteredProducts = [...products];

  // Tab filter
  if (categoryFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.type === categoryFilter);
  }

  // Price filter
  filteredProducts = filteredProducts.filter(p => {
    const price = p.numericPrice || p.price;
    return typeof price === 'number' ? price <= priceRange : true;
  });

  // Sort
  if (sortOption === 'low-to-high') {
    filteredProducts.sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (sortOption === 'high-to-low') {
    filteredProducts.sort((a, b) => b.numericPrice - a.numericPrice);
  }

  const categoryTitles = {
    'all': 'The Complete Collection',
    'bracelet': 'Exquisite Bracelets',
    'pendant': 'Signature Pendants',
    'ring': 'Elegance Rings',
    'earring': 'Radiant Earrings'
  };

  const categoryDescriptions = {
    'all': 'Discover our masterpieces crafted with exceptional artistry and timeless beauty.',
    'bracelet': 'Adorn your wrists with meticulously designed bracelets that captivate.',
    'pendant': 'Necklaces and pendants that lay perfectly close to your heart.',
    'ring': 'Symbolic rings combining brilliant cut gems with precious metals.',
    'earring': 'Frames of light to illuminate your face with every movement.'
  };

  return (
    <div className="product-listing-page">
      <NavigationBar />
      
      {/* Removed Hero Section */}

      <div className="listing-container">
        {/* Sticky Control Bar */}
        <div className={`collection-controls ${isScrolled ? 'is-sticky' : ''}`}>
          <div className="controls-inner">
            
            {/* Category Navigation - Desktop & Tablet */}
            <div className="category-nav">
              {['all', 'ring', 'earring', 'pendant', 'bracelet'].map(cat => (
                <button 
                  key={cat}
                  className={`cat-nav-btn ${categoryFilter === cat ? 'active' : ''}`} 
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  {categoryFilter === cat && <span className="active-dot"></span>}
                </button>
              ))}
            </div>

            {/* Mobile Category Select */}
            <div className="mobile-category-nav">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="mobile-cat-select"
              >
                <option value="all">All Categories</option>
                <option value="ring">Rings</option>
                <option value="earring">Earrings</option>
                <option value="pendant">Pendants</option>
                <option value="bracelet">Bracelets</option>
              </select>
            </div>

            {/* Actions (Filter / Sort) */}
            <div className="control-actions">
              <div className="action-dropdown-wrapper">
                <button 
                  className={`action-btn ${showPriceDropdown ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setShowPriceDropdown(!showPriceDropdown); setShowSortDropdown(false); }}
                >
                  <span>Filter by Price</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                
                {showPriceDropdown && (
                  <div className="dropdown-panel price-panel fade-in-down" onClick={(e) => e.stopPropagation()}>
                    <div className="panel-header">
                      <h4>Price Range</h4>
                      <span className="current-range">Up to ₹{priceRange.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="range-slider-container">
                      <input 
                        type="range" 
                        min="500" 
                        max="25000" 
                        step="500"
                        value={priceRange} 
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="luxury-range"
                      />
                      <div className="range-track" style={{ width: `${(priceRange / 25000) * 100}%` }}></div>
                    </div>
                    <div className="range-labels">
                      <span>₹500</span>
                      <span>₹25,000+</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="action-dropdown-wrapper">
                <button 
                  className={`action-btn ${showSortDropdown ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setShowSortDropdown(!showSortDropdown); setShowPriceDropdown(false); }}
                >
                  <span>Sort By</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                    <line x1="8" y1="5" x2="16" y2="5" />
                  </svg>
                </button>
                
                {showSortDropdown && (
                  <div className="dropdown-panel sort-panel fade-in-down" onClick={(e) => e.stopPropagation()}>
                    <button className={sortOption === 'default' ? 'active' : ''} onClick={() => { setSortOption('default'); setShowSortDropdown(false); }}>
                      Recommended
                    </button>
                    <button className={sortOption === 'low-to-high' ? 'active' : ''} onClick={() => { setSortOption('low-to-high'); setShowSortDropdown(false); }}>
                      Price: Low to High
                    </button>
                    <button className={sortOption === 'high-to-low' ? 'active' : ''} onClick={() => { setSortOption('high-to-low'); setShowSortDropdown(false); }}>
                      Price: High to Low
                    </button>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>

        <main className="listing-main">
          {loading ? (
            <div className="skeleton-grid">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="skeleton-card" style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="skeleton-image shimmer"></div>
                  <div className="skeleton-body">
                    <div className="skeleton-title shimmer"></div>
                    <div className="skeleton-price shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state fade-in-up">
              <div className="empty-icon">✧</div>
              <h3>No Creations Found</h3>
              <p>We couldn't find any pieces matching your current filters.</p>
              <button className="reset-btn" onClick={() => { setCategoryFilter('all'); setPriceRange(25000); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-layout fade-in-up">
              <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;

