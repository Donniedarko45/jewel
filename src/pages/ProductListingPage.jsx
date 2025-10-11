import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import './ProductListingPage.css';

const ProductListingPage = ({ onNavigate, onProductClick }) => {
  const [filters, setFilters] = useState({});

  const products = [
    {
      id: 1,
      title: 'Classic Diamond Ring',
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&q=80'
    },
    {
      id: 2,
      title: 'Pearl Drop Earrings',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80'
    },
    {
      id: 3,
      title: 'Gold Chain Necklace',
      price: '$1,299',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80'
    },
    {
      id: 4,
      title: 'Emerald Bracelet',
      price: '$3,199',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80'
    },
    {
      id: 5,
      title: 'Sapphire Pendant',
      price: '$1,899',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=80'
    },
    {
      id: 6,
      title: 'Ruby Stud Earrings',
      price: '$1,599',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80'
    },
    {
      id: 7,
      title: 'Platinum Band Ring',
      price: '$2,799',
      image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80'
    },
    {
      id: 8,
      title: 'Diamond Tennis Bracelet',
      price: '$4,299',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80'
    },
    {
      id: 9,
      title: 'Pearl Strand Necklace',
      price: '$1,199',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80'
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="product-listing-page">
      <NavigationBar onNavigate={onNavigate} />
      <div className="listing-container">
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        <main className="listing-main">
          <div className="listing-header">
            <h1>All Jewelry</h1>
            <p className="product-count">{products.length} Products</p>
          </div>
          <ProductGrid products={products} onProductClick={onProductClick} />
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
