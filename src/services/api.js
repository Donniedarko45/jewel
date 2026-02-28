// API Base URL
const API_BASE_URL = 'https://jewel-kxpf.onrender.com/api';

// Get stored admin password
const getAuthHeader = () => {
    const password = localStorage.getItem('adminPassword');
    return password ? { Authorization: `Bearer ${password}` } : {};
};

// Product API
export const productApi = {
    // Get all products (public)
    getAll: async (type = null) => {
        const url = type
            ? `${API_BASE_URL}/products?type=${type}`
            : `${API_BASE_URL}/products`;
        const response = await fetch(url);
        return response.json();
    },

    // Get single product (public)
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return response.json();
    },

    // Create product (protected)
    create: async (productData) => {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(productData)
        });
        return response.json();
    },

    // Update product (protected)
    update: async (id, productData) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(productData)
        });
        return response.json();
    },

    // Delete product (protected)
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return response.json();
    }
};

// Upload API
export const uploadApi = {
    // Upload images (protected)
    uploadImages: async (files) => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: formData
        });
        return response.json();
    },

    // Delete image (protected)
    deleteImage: async (publicId) => {
        const response = await fetch(`${API_BASE_URL}/upload/${encodeURIComponent(publicId)}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return response.json();
    }
};

// Auth API
export const authApi = {
    // Verify password
    verify: async (password) => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${password}`
            }
        });
        return response.json();
    },

    // Save password to localStorage
    login: (password) => {
        localStorage.setItem('adminPassword', password);
    },

    // Remove password from localStorage
    logout: () => {
        localStorage.removeItem('adminPassword');
    },

    // Check if logged in
    isLoggedIn: () => {
        return !!localStorage.getItem('adminPassword');
    }
};
