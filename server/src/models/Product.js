import { getPool } from '../config/database.js';

// Helper to compute derived fields before insert/update
const computeDerivedFields = (data) => {
    const inStock = data.quantity > 0;
    const isSale = data.originalPrice != null && data.originalPrice > data.price;
    return { inStock, isSale };
};

// Convert snake_case DB row to camelCase JS object
const toProduct = (row) => {
    if (!row) return null;
    return {
        _id: row.id,
        id: row.id,
        type: row.type,
        name: row.name,
        price: parseFloat(row.price),
        originalPrice: row.original_price ? parseFloat(row.original_price) : null,
        quantity: row.quantity,
        description: row.description,
        images: row.images || [],
        inStock: row.in_stock,
        isSale: row.is_sale,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
};

const Product = {
    // Find all products, optionally filtered, sorted by created_at DESC
    async find(filter = {}) {
        let query = 'SELECT * FROM products';
        const values = [];
        const conditions = [];

        if (filter.type) {
            conditions.push(`type = $${values.length + 1}`);
            values.push(filter.type);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC';

        const result = await getPool().query(query, values);
        return result.rows.map(toProduct);
    },

    // Find a single product by ID
    async findById(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) return null;

        const result = await getPool().query('SELECT * FROM products WHERE id = $1', [numericId]);
        return toProduct(result.rows[0]);
    },

    // Create a new product
    async create(data) {
        const { inStock, isSale } = computeDerivedFields(data);

        const result = await getPool().query(
            `INSERT INTO products (type, name, price, original_price, quantity, description, images, in_stock, is_sale)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *`,
            [
                data.type,
                data.name,
                data.price,
                data.originalPrice || null,
                data.quantity ?? 0,
                data.description,
                JSON.stringify(data.images || []),
                inStock,
                isSale,
            ]
        );

        return toProduct(result.rows[0]);
    },

    // Update a product by ID
    async findByIdAndUpdate(id, data) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) return null;

        const { inStock, isSale } = computeDerivedFields(data);

        const result = await getPool().query(
            `UPDATE products
             SET type = $1, name = $2, price = $3, original_price = $4, quantity = $5,
                 description = $6, images = $7, in_stock = $8, is_sale = $9
             WHERE id = $10
             RETURNING *`,
            [
                data.type,
                data.name,
                data.price,
                data.originalPrice || null,
                data.quantity ?? 0,
                data.description,
                JSON.stringify(data.images || []),
                inStock,
                isSale,
                numericId,
            ]
        );

        return toProduct(result.rows[0]);
    },

    // Delete a product by ID
    async findByIdAndDelete(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) return null;

        const result = await getPool().query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [numericId]
        );

        return toProduct(result.rows[0]);
    },
};

export default Product;
