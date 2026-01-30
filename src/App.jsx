import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductForm from './pages/AdminProductForm';
import './App.css';

// Home Page Component
function HomePage() {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };

  return (
    <div className="app">
      <HeroSection onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />
      <FeaturesSection />
      <FeaturedProducts onProductClick={handleProductClick} />
      <AboutSection />
      <Footer />
    </div>
  );
}

// Products Page Wrapper
function ProductsPage() {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };

  return (
    <ProductListingPage
      onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
      onProductClick={handleProductClick}
    />
  );
}

// Product Detail Page Wrapper
function ProductDetailWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();

  // For now, we'll pass the product ID and let the page fetch it
  // This is a simplified version - actual product data would come from API
  const product = { id, _id: id };

  return (
    <ProductDetailPage
      product={product}
      productId={id}
      onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
    />
  );
}

// Admin Dashboard Wrapper
function AdminDashboardWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page, productId = null) => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'admin-add') {
      navigate('/admin/add');
    } else if (page === 'admin-edit' && productId) {
      navigate(`/admin/edit/${productId}`);
    } else if (page === 'admin') {
      navigate('/admin');
    } else {
      navigate(`/${page}`);
    }
  };

  return <AdminDashboard onNavigate={handleNavigate} />;
}

// Admin Add Product Wrapper
function AdminAddProductWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'admin') {
      navigate('/admin');
    } else if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  return <AdminProductForm onNavigate={handleNavigate} />;
}

// Admin Edit Product Wrapper
function AdminEditProductWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = (page) => {
    if (page === 'admin') {
      navigate('/admin');
    } else if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  return <AdminProductForm onNavigate={handleNavigate} productId={id} />;
}

// Main App with Router
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailWrapper />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardWrapper />} />
        <Route path="/admin/add" element={<AdminAddProductWrapper />} />
        <Route path="/admin/edit/:id" element={<AdminEditProductWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
