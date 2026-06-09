import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';
import NavigationBar from './components/NavigationBar';
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

function HomePage() {
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };
  return (
    <div className="app">
      <NavigationBar />
      <HeroSection onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />
      <FeaturesSection />
      <FeaturedProducts onProductClick={handleProductClick} />
      <AboutSection />
      <Footer />
    </div>
  );
}

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

function ProductDetailWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = { id, _id: id };
  return (
    <ProductDetailPage
      product={product}
      productId={id}
      onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
    />
  );
}

function AdminDashboardWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page, productId = null) => {
    if (page === 'home') navigate('/');
    else if (page === 'admin-add') navigate('/admin/add');
    else if (page === 'admin-edit' && productId) navigate(`/admin/edit/${productId}`);
    else if (page === 'admin') navigate('/admin');
    else navigate(`/${page}`);
  };
  return <AdminDashboard onNavigate={handleNavigate} />;
}

function AdminAddProductWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page) => {
    if (page === 'admin') navigate('/admin');
    else if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };
  return <AdminProductForm onNavigate={handleNavigate} />;
}

function AdminEditProductWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleNavigate = (page) => {
    if (page === 'admin') navigate('/admin');
    else if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };
  return <AdminProductForm onNavigate={handleNavigate} productId={id} />;
}

function App() {
  return (
    <Router>
      <CartProvider>
        <CartSidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} />
          <Route path="/admin" element={<AdminDashboardWrapper />} />
          <Route path="/admin/add" element={<AdminAddProductWrapper />} />
          <Route path="/admin/edit/:id" element={<AdminEditProductWrapper />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
