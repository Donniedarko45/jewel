import { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryShowcase from './components/CategoryShowcase';
import LogoBar from './components/LogoBar';
import Footer from './components/Footer';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'product-detail' && selectedProduct) {
    return <ProductDetailPage product={selectedProduct} onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'products') {
    return <ProductListingPage onNavigate={setCurrentPage} onProductClick={handleProductClick} />;
  }

  return (
    <div className="app">
      <HeroSection onNavigate={setCurrentPage} />
      <FeaturesSection />
      <AboutSection />
      <FeaturedProducts onProductClick={handleProductClick} />
      <CategoryShowcase onNavigate={setCurrentPage} />
      <LogoBar />
      <Footer />
    </div>
  );
}

export default App;
