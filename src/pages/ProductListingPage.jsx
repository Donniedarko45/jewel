import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import { productApi } from '../services/api.js';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sidebarFilters, setSidebarFilters] = useState({ categories: [], priceRange: 10000 });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  useEffect(() => {
    fetchProducts();

    const handleOutsideClick = () => {
      setShowSortDropdown(false);
      setShowPriceDropdown(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
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
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };

  const handleSidebarFilter = (filters) => {
    setSidebarFilters(filters);
  };

  // Apply all filters
  let filteredProducts = [...products];

  // Tab filter
  if (categoryFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.type === categoryFilter);
  }

  // Sidebar category filter
  if (sidebarFilters.categories.length > 0) {
    filteredProducts = filteredProducts.filter(p => sidebarFilters.categories.includes(p.type));
  }

  // Price filter
  filteredProducts = filteredProducts.filter(p => {
    const price = p.numericPrice || p.price;
    return typeof price === 'number' ? price <= sidebarFilters.priceRange : true;
  });

  // Sort
  if (sortOption === 'low-to-high') {
    filteredProducts.sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (sortOption === 'high-to-low') {
    filteredProducts.sort((a, b) => b.numericPrice - a.numericPrice);
  }

  return (
    <div className="product-listing-page">
      <NavigationBar />
      <div className={`listing-container ${showMobileFilters ? '' : 'no-sidebar'}`}>
        <div className={`sidebar-wrapper ${showMobileFilters ? 'show' : 'collapsed'}`}>
          <Sidebar filters={sidebarFilters} onFilterChange={handleSidebarFilter} />
        </div>
        <main className="listing-main">
          <div className="collection-header-dark" onClick={(e) => e.stopPropagation()}>
            <h2>Jewelry Collection</h2>
            <p>Discover timeless elegance</p>

            <div className="category-pills-row">
              <button className={`category-pill-btn ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All</button>
              <button className={`category-pill-btn ${categoryFilter === 'bracelet' ? 'active' : ''}`} onClick={() => setCategoryFilter('bracelet')}>Bracelets</button>
              <button className={`category-pill-btn ${categoryFilter === 'pendant' ? 'active' : ''}`} onClick={() => setCategoryFilter('pendant')}>Pendants</button>
              <button className={`category-pill-btn ${categoryFilter === 'ring' ? 'active' : ''}`} onClick={() => setCategoryFilter('ring')}>Rings</button>
              <button className={`category-pill-btn ${categoryFilter === 'earring' ? 'active' : ''}`} onClick={() => setCategoryFilter('earring')}>Earrings</button>
            </div>

            <div className="filter-sort-price-bar">
              <button 
                className={`bar-action-btn ${showMobileFilters ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setShowMobileFilters(!showMobileFilters); setShowSortDropdown(false); setShowPriceDropdown(false); }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="2" y1="14" x2="6" y2="14" />
                  <line x1="10" y1="8" x2="14" y2="8" />
                  <line x1="18" y1="16" x2="22" y2="16" />
                </svg>
                <span>Filter</span>
              </button>

              <button 
                className={`bar-action-btn ${showSortDropdown ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setShowSortDropdown(!showSortDropdown); setShowPriceDropdown(false); }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                  <line x1="8" y1="5" x2="16" y2="5" />
                </svg>
                <span>Sort {sortOption !== 'default' && `(${sortOption === 'low-to-high' ? 'Low-High' : 'High-Low'})`}</span>
              </button>

              <button 
                className={`bar-action-btn ${showPriceDropdown ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setShowPriceDropdown(!showPriceDropdown); setShowSortDropdown(false); }}
              >
                <span className="rupee-icon">₹</span>
                <span>Price</span>
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <div className="bar-dropdown-container">
              {showPriceDropdown && (
                <div className="bar-dropdown price-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  <h4>Filter by Price</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="100"
                    value={sidebarFilters.priceRange} 
                    onChange={(e) => setSidebarFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                  />
                  <div className="price-range-limits">
                    <span>₹0</span>
                    <span>Max: ₹{sidebarFilters.priceRange.toLocaleString('en-IN')}</span>
                  </div>
                  <button className="btn-close-dropdown" onClick={() => setShowPriceDropdown(false)}>Apply</button>
                </div>
              )}

              {showSortDropdown && (
                <div className="bar-dropdown sort-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  <button className={sortOption === 'default' ? 'active' : ''} onClick={() => { setSortOption('default'); setShowSortDropdown(false); }}>Default</button>
                  <button className={sortOption === 'low-to-high' ? 'active' : ''} onClick={() => { setSortOption('low-to-high'); setShowSortDropdown(false); }}>Price: Low to High</button>
                  <button className={sortOption === 'high-to-low' ? 'active' : ''} onClick={() => { setSortOption('high-to-low'); setShowSortDropdown(false); }}>Price: High to Low</button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="loading-state">No products found</div>
          ) : (
            <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;
