// API Base URL
const API_BASE_URL = 'https://jewel-kxpf.onrender.com/api';

// Get stored admin password
const getAuthHeader = () => {
    const password = localStorage.getItem('adminPassword');
    return password ? { Authorization: `Bearer ${password}` } : {};
};

const FALLBACK_PRODUCTS = [
  {
    _id: "fallback-bracelet-1",
    id: "fallback-bracelet-1",
    type: "bracelet",
    name: "Anti-Tarnish Gold Open Cuff Bracelet",
    price: 260,
    originalPrice: 380,
    description: "Material: Premium Stainless Steel\nFinish: Anti-Tarnish Gold Plating\nStyle: Minimalist Luxury\nDesign: Open Cuff with Overlap Detail\nIdeal For: Women & Girls\nOccasion: Daily Wear, Office, Party, Festive, Gifting\nFeatures: Anti-Tarnish, Lightweight, Adjustable, Skin-Friendly, Durable, Long-Lasting Shine",
    aboutProduct: "A premium anti-tarnish gold-plated open cuff bracelet featuring a sleek and modern overlap design. Lightweight, elegant, and durable, it adds a touch of sophistication to both everyday and occasion wear.",
    images: [
      "https://res.cloudinary.com/die8tcfj1/image/upload/v1781030783/jewel/products/ulp3xg7fg011ofev6jz3.png",
      "https://res.cloudinary.com/die8tcfj1/image/upload/v1781030783/jewel/products/rwu7btqa16i7gyoxlmbb.png",
      "https://res.cloudinary.com/die8tcfj1/image/upload/v1781030783/jewel/products/cubiykq0boewlwmyzfoa.png"
    ],
    reviews: [],
    inStock: true,
    isSale: false
  },
  {
    _id: "fallback-bracelet-2",
    id: "fallback-bracelet-2",
    type: "bracelet",
    name: "Anti-Tarnish Cartier Style Bracelet",
    price: 230,
    originalPrice: 350,
    description: "Material: Premium Stainless Steel\nFinish: 18K Gold Plating\nStyle: Classic Screw Motif\nDesign: Cartier-Inspired Hinged Oval Bangle\nIdeal For: Women & Men\nOccasion: Daily Wear, Luxury Accents\nFeatures: Anti-Tarnish, Sweatproof, Hypoallergenic, Durable",
    aboutProduct: "A timeless Cartier-inspired gold bracelet featuring a sleek screw motif design. Crafted with an anti-tarnish finish, this elegant piece keeps its shine and adds a luxurious touch to any outfit.",
    images: [
      "https://res.cloudinary.com/die8tcfj1/image/upload/v1772821022/jewel/products/cl2jtq1xgbao7pyrsbji.png",
      "https://res.cloudinary.com/die8tcfj1/image/upload/v1772821055/jewel/products/bb1iapdpllgnicvvvink.png"
    ],
    reviews: [],
    inStock: true,
    isSale: false
  },
  {
    _id: "fallback-pendant-1",
    id: "fallback-pendant-1",
    type: "pendant",
    name: "Anti-Tarnish Initial Pendant Neckpiece",
    price: 190,
    originalPrice: 280,
    description: "Material: 925 Sterling Silver\nFinish: 18K Gold Plated\nStyle: Personalized Luxury\nDesign: Minimalist Letter Carving with Delicate Chain\nIdeal For: Women & Girls\nOccasion: Everyday Elegance, Birthday Gift\nFeatures: Anti-Tarnish, Water-Resistant, Delicate Link Chain",
    aboutProduct: "Add a personal touch to your style with our anti-tarnish initial pendant neckpiece. Crafted from premium sterling silver with a thick gold plating, it offers long-lasting everyday elegance.",
    images: [
      "https://res.cloudinary.com/die8tcfj1/image/upload/v1764785960/1764440232861_lrvgt3.png"
    ],
    reviews: [],
    inStock: true,
    isSale: true
  },
  {
    _id: "fallback-pendant-2",
    id: "fallback-pendant-2",
    type: "pendant",
    name: "Celestial Sun & Moon Duo Pendant",
    price: 240,
    originalPrice: 360,
    description: "Material: 316L Stainless Steel\nFinish: Two-Tone Silver & Gold Plated\nStyle: Mystical Modern\nDesign: Interlocking Sun and Crescent Moon Motif\nIdeal For: Unisex\nOccasion: Casual Wear, Unique Gifting\nFeatures: Anti-Tarnish, Sweatproof, Lead & Nickel Free",
    aboutProduct: "A stunning celestial sun and moon duo pendant representing balance and harmony. Designed with a premium two-tone finish and anti-tarnish protection, it remains bright under daily use.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"
    ],
    reviews: [],
    inStock: true,
    isSale: false
  },
  {
    _id: "fallback-pendant-3",
    id: "fallback-pendant-3",
    type: "pendant",
    name: "Vintage Emerald Cut Solitaire Pendant",
    price: 380,
    originalPrice: 550,
    description: "Material: 925 Sterling Silver\nFinish: Platinum Rhodium Plated\nStyle: Heritage Luxury\nDesign: Emerald-Cut Cubic Zirconia Solitaire\nIdeal For: Women\nOccasion: Formal Wear, Festive, Anniversary\nFeatures: Premium Sparkle, Anti-Tarnish, Anti-Oxidant Coating",
    aboutProduct: "Inspired by vintage heritage glamour, this emerald-cut solitaire pendant shines with brilliant intensity. Perfect for elevating formal dresses or festive looks.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
    ],
    reviews: [],
    inStock: true,
    isSale: false
  }
];

// Product API
export const productApi = {
    // Get all products (public)
    getAll: async (type = null) => {
        let serverProducts = [];
        try {
            const url = type
                ? `${API_BASE_URL}/products?type=${type}`
                : `${API_BASE_URL}/products`;
            const response = await fetch(url);
            const resData = await response.json();
            if (resData.success) {
                serverProducts = resData.data;
            }
        } catch (err) {
            console.log('Failed to fetch from server, using fallbacks', err);
        }

        // Merge with fallback products to ensure we don't have empty categories or look dummy
        const names = new Set(serverProducts.map(p => p.name.toLowerCase()));
        const uniqueFallbacks = FALLBACK_PRODUCTS.filter(p => !names.has(p.name.toLowerCase()));
        let merged = [...serverProducts, ...uniqueFallbacks];

        if (type) {
            merged = merged.filter(p => p.type === type);
        }

        return { success: true, count: merged.length, data: merged };
    },

    // Get single product (public)
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            const resData = await response.json();
            if (resData.success) {
                return resData;
            }
        } catch (err) {
            console.log('Server fetch failed for ID, checking local fallbacks', err);
        }

        // Check local fallbacks
        const matched = FALLBACK_PRODUCTS.find(p => String(p.id) === String(id) || String(p._id) === String(id));
        if (matched) {
            return { success: true, data: matched };
        }

        return { success: false, message: 'Product not found' };
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
    },

    // Add review (public)
    addReview: async (id, reviewData) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
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
