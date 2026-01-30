import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import { productApi } from '../services/api.js';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Fallback products for when backend is not running
  const fallbackProducts = [
    {
      id: 1,
      title: 'Classic Diamond Bracelet',
      price: '$2,499',
      type: 'bracelet',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80'
    },
    {
      id: 2,
      title: 'Gold Chain Pendant',
      price: '$899',
      type: 'pendant',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80'
    },
    {
      id: 3,
      title: 'Emerald Gold Bracelet',
      price: '$3,199',
      type: 'bracelet',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80'
    },
    {
      id: 4,
      title: 'Sapphire Pendant',
      price: '$1,899',
      type: 'pendant',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=80'
    },
    {
      id: 5,
      title: 'Diamond Tennis Bracelet',
      price: '$4,299',
      type: 'bracelet',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80'
    },
    {
      id: 6,
      title: 'Pearl Drop Pendant',
      price: '$1,199',
      type: 'pendant',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll();

      if (response.success && response.data.length > 0) {
        // Transform API data to match component expectations
        const transformedProducts = response.data.map(product => ({
          id: product._id,
          title: product.name,
          price: `$${product.price.toLocaleString()}`,
          type: product.type,
          image: product.images?.[0]?.url || 'https://via.placeholder.com/500',
          secondaryImage: product.images?.[1]?.url || product.images?.[0]?.url,
          // Keep original data for detail page
          ...product
        }));
        setProducts(transformedProducts);
      } else {
        // Use fallback if no products in database
        setProducts(fallbackProducts);
      }
    } catch (err) {
      console.log('Using fallback products - backend may not be running');
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };

  // Filter products by category
  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.type === categoryFilter);

  return (
    <div className="product-listing-page">
      <NavigationBar />
      <div className="listing-container">
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        <main className="listing-main">
          <div className="listing-header">
            <h1>
              {categoryFilter === 'all' ? 'All Jewelry' :
                categoryFilter === 'bracelet' ? 'Bracelets' : 'Pendants'}
            </h1>
            <p className="product-count">{filteredProducts.length} Products</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-tabs">
            <button
              className={`category-tab ${categoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              All
            </button>
            <button
              className={`category-tab ${categoryFilter === 'bracelet' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('bracelet')}
            >
              Bracelets
            </button>
            <button
              className={`category-tab ${categoryFilter === 'pendant' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('pendant')}
            >
              Pendants
            </button>
          </div>

          {loading ? (
            <div className="loading-state">Loading products...</div>
          ) : (
            <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
