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

  useEffect(() => {
    fetchProducts();
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
  let filteredProducts = products;

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

  return (
    <div className="product-listing-page">
      <NavigationBar />
      <div className="listing-container">
        <div className={`sidebar-wrapper ${showMobileFilters ? 'show' : ''}`}>
          <Sidebar filters={sidebarFilters} onFilterChange={handleSidebarFilter} />
        </div>
        <main className="listing-main">
          <div className="listing-top">
            <div className="listing-header">
              <h1>
                {categoryFilter === 'all' ? 'All Jewelry' :
                  categoryFilter === 'bracelet' ? 'Bracelets' : 'Pendants'}
              </h1>
              <div className="listing-header-actions">
                <button 
                  className={`filter-toggle-btn ${showMobileFilters ? 'active' : ''}`}
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  aria-label="Toggle filters"
                >
                  {showMobileFilters ? 'Hide Filters ✕' : 'Filter & Price ⚙️'}
                </button>
                <p className="product-count">{filteredProducts.length} Products</p>
              </div>
            </div>

            <div className="category-tabs">
              <button className={`category-tab ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All</button>
              <button className={`category-tab ${categoryFilter === 'bracelet' ? 'active' : ''}`} onClick={() => setCategoryFilter('bracelet')}>Bracelets</button>
              <button className={`category-tab ${categoryFilter === 'pendant' ? 'active' : ''}`} onClick={() => setCategoryFilter('pendant')}>Pendants</button>
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
