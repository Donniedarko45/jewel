import { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import CategoryShowcase from './components/CategoryShowcase';
import FeaturedProducts from './components/FeaturedProducts';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
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
      <NavigationBar onNavigate={setCurrentPage} />
      <HeroSection onNavigate={setCurrentPage} />
      <CategoryShowcase onNavigate={setCurrentPage} />
      <FeaturedProducts onProductClick={handleProductClick} />
      <AboutSection />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
