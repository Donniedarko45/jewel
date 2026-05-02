import { useState, useEffect } from 'react';
import { productApi, authApi } from '../services/api.js';
import logoImage from '../assets/logoDiva.png';
import './AdminDashboard.css';

const AdminDashboard = ({ onNavigate }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(authApi.isLoggedIn());
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productApi.getAll();
            if (response.success) {
                setProducts(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const response = await authApi.verify(password);
            if (response.success) {
                authApi.login(password);
                setIsLoggedIn(true);
                setPassword('');
            } else {
                setLoginError('Invalid password');
            }
        } catch {
            setLoginError('Login failed. Is the server running?');
        }
    };

    const handleLogout = () => {
        authApi.logout();
        setIsLoggedIn(false);
        setProducts([]);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await productApi.delete(id);
            if (response.success) {
                setProducts(products.filter(p => p._id !== id));
            } else {
                alert(response.message);
            }
        } catch {
            alert('Failed to delete product');
        }
    };

    // Stats
    const totalProducts = products.length;
    const bracelets = products.filter(p => p.type === 'bracelet').length;
    const pendants = products.filter(p => p.type === 'pendant').length;

    if (!isLoggedIn) {
        return (
            <div className="admin-dashboard">
                <div className="admin-login">
                    <div className="login-card">
                        <img src={logoImage} alt="Diva & Co." className="login-logo" />
                        <h1>Owner Portal</h1>
                        <p>Enter your admin password to continue</p>

                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin Password"
                                autoFocus
                            />
                            {loginError && <p className="error-message">{loginError}</p>}
                            <button type="submit" className="btn-login">Login</button>
                        </form>

                        <button className="btn-back" onClick={() => onNavigate('home')}>
                            ← Back to Store
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="header-left">
                    <img src={logoImage} alt="Diva & Co." className="header-logo" />
                    <h1>Owner Dashboard</h1>
                    <button className="btn-back-store" onClick={() => onNavigate('home')}>
                        ← Back to Store
                    </button>
                </div>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </header>

            <div className="admin-stats">
                <div className="stat-card">
                    <span className="stat-number">{totalProducts}</span>
                    <span className="stat-label">Total Products</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{bracelets}</span>
                    <span className="stat-label">Bracelets</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{pendants}</span>
                    <span className="stat-label">Pendants</span>
                </div>
            </div>

            <div className="admin-actions">
                <button className="btn-add-product" onClick={() => onNavigate('admin-add')}>
                    + Add New Product
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <p>No products yet. Add your first product!</p>
                </div>
            ) : (
                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="product-thumb">
                                            {product.images?.[0]?.url ? (
                                                <img src={product.images[0].url} alt={product.name} />
                                            ) : (
                                                <div className="no-image">No Image</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="product-name">{product.name}</td>
                                    <td>
                                        <span className={`type-badge ${product.type}`}>
                                            {product.type}
                                        </span>
                                    </td>
                                    <td>
                                        ₹{product.price}
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="original-price">₹{product.originalPrice}</span>
                                        )}
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => onNavigate('admin-edit', product._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
