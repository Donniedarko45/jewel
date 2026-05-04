import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET all products (public — hides quantity)
router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type ? { type } : {};

        const products = await Product.findPublic(filter);

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// GET single product (public — hides quantity)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdPublic(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// POST create product (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { type, name, price, originalPrice, quantity, description, aboutProduct, images, reviews } = req.body;

        // Basic validation
        const errors = [];
        if (!type) errors.push('Product type is required');
        if (!name) errors.push('Product name is required');
        if (price == null) errors.push('Product price is required');
        if (!description) errors.push('Product description is required');

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }

        const product = await Product.create({
            type,
            name,
            price,
            originalPrice,
            quantity,
            description,
            aboutProduct,
            images,
            reviews
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        // Handle PostgreSQL constraint violations
        if (error.code === '23514' || error.code === '23502') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: [error.detail || error.message]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// PUT update product (protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { type, name, price, originalPrice, quantity, description, aboutProduct, images, reviews } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { type, name, price, originalPrice, quantity, description, aboutProduct, images, reviews }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        // Handle PostgreSQL constraint violations
        if (error.code === '23514' || error.code === '23502') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: [error.detail || error.message]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// DELETE product (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// POST review (public - customers can review)
router.post('/:id/reviews', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const { name, rating, comment } = req.body;
        if (!name || !comment || !rating) {
            return res.status(400).json({ success: false, message: 'Name, rating and comment are required' });
        }

        const newReview = {
            name,
            rating: Math.min(5, Math.max(1, parseInt(rating))),
            comment,
            date: new Date().toISOString()
        };

        const updatedReviews = [...(product.reviews || []), newReview];
        const updated = await Product.findByIdAndUpdate(req.params.id, {
            ...product,
            reviews: updatedReviews
        });

        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

export default router;
