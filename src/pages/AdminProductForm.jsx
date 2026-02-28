import { useState, useEffect, useRef } from 'react';
import { productApi, uploadApi, authApi } from '../services/api.js';
import logoImage from '../assets/logoDiva.png';
import './AdminProductForm.css';

const AdminProductForm = ({ onNavigate, productId = null }) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        type: 'bracelet',
        name: '',
        price: '',
        originalPrice: '',
        quantity: '',
        description: '',
        images: []
    });

    const isEditing = !!productId;

    useEffect(() => {
        if (!authApi.isLoggedIn()) {
            onNavigate('admin');
            return;
        }

        if (isEditing) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productApi.getById(productId);
            if (response.success) {
                const product = response.data;
                setFormData({
                    type: product.type,
                    name: product.name,
                    price: product.price.toString(),
                    originalPrice: product.originalPrice?.toString() || '',
                    quantity: product.quantity.toString(),
                    description: product.description,
                    images: product.images || []
                });
            } else {
                setError('Product not found');
            }
        } catch {
            setError('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            setUploading(true);
            const response = await uploadApi.uploadImages(files);

            if (response.success) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...response.data]
                }));
            } else {
                alert(response.message || 'Failed to upload images');
            }
        } catch {
            alert('Failed to upload images. Is the server running?');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveImage = async (index) => {
        const image = formData.images[index];

        // Optionally delete from Cloudinary
        if (image.publicId) {
            try {
                await uploadApi.deleteImage(image.publicId);
            } catch {
                // Continue even if delete fails
            }
        }

        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name.trim()) {
            setError('Product name is required');
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setError('Valid price is required');
            return;
        }
        if (!formData.quantity || parseInt(formData.quantity) < 0) {
            setError('Valid quantity is required');
            return;
        }
        if (!formData.description.trim()) {
            setError('Description is required');
            return;
        }

        const productData = {
            type: formData.type,
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
            quantity: parseInt(formData.quantity),
            description: formData.description.trim(),
            images: formData.images
        };

        try {
            setLoading(true);

            const response = isEditing
                ? await productApi.update(productId, productData)
                : await productApi.create(productData);

            if (response.success) {
                onNavigate('admin');
            } else {
                setError(response.message || 'Failed to save product');
            }
        } catch {
            setError('Failed to save product. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return <div className="admin-form-page"><div className="loading">Loading product...</div></div>;
    }

    return (
        <div className="admin-form-page">
            <div className="form-container">
                <header className="form-header">
                    <img src={logoImage} alt="Diva & Co." className="form-logo" />
                    <button className="btn-back" onClick={() => onNavigate('admin')}>
                        ← Back to Dashboard
                    </button>
                    <h1>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
                </header>

                <form onSubmit={handleSubmit} className="product-form">
                    {error && <div className="form-error">{error}</div>}

                    {/* Image Upload Section */}
                    <div className="form-section">
                        <label className="section-label">Product Images</label>
                        <div className="images-container">
                            {formData.images.map((image, index) => (
                                <div key={index} className="image-preview">
                                    <img src={image.url} alt={`Product ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            <label className="upload-box">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                                {uploading ? (
                                    <span>Uploading...</span>
                                ) : (
                                    <>
                                        <span className="upload-icon">+</span>
                                        <span>Add Photos</span>
                                    </>
                                )}
                            </label>
                        </div>
                        <p className="help-text">Upload multiple images. First image will be the main image.</p>
                    </div>

                    {/* Product Type */}
                    <div className="form-group">
                        <label htmlFor="type">Product Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="bracelet">Bracelet</option>
                            <option value="pendant">Pendant</option>
                        </select>
                    </div>

                    {/* Product Name */}
                    <div className="form-group">
                        <label htmlFor="name">Product Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Gold Diamond Bracelet"
                            required
                        />
                    </div>

                    {/* Price Section */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price (₹) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="originalPrice">Original Price (₹)</label>
                            <input
                                type="number"
                                id="originalPrice"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleInputChange}
                                placeholder="For sale items"
                                min="0"
                                step="0.01"
                            />
                            <p className="help-text">Leave empty if not on sale</p>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity *</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter product description..."
                            rows="5"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => onNavigate('admin')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
