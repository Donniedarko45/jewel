import { getPool } from '../config/database.js';

const computeDerivedFields = (data) => {
    const inStock = data.quantity > 0;
    const isSale = data.originalPrice != null && data.originalPrice > data.price;
    return { inStock, isSale };
};

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
        aboutProduct: row.about_product || '',
        images: row.images || [],
        reviews: row.reviews || [],
        inStock: row.in_stock,
        isSale: row.is_sale,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
};

// Public version — hides quantity from customers
const toPublicProduct = (row) => {
    const product = toProduct(row);
    if (!product) return null;
    const { quantity, ...publicData } = product;
    return publicData;
};

const Product = {
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

    // Public version — hides quantity
    async findPublic(filter = {}) {
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
        return result.rows.map(toPublicProduct);
    },

    async findById(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) return null;
        const result = await getPool().query('SELECT * FROM products WHERE id = $1', [numericId]);
        return toProduct(result.rows[0]);
    },

    // Public version — hides quantity
    async findByIdPublic(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) return null;
        const result = await getPool().query('SELECT * FROM products WHERE id = $1', [numericId]);
        return toPublicProduct(result.rows[0]);
    },

    async create(data) {
        const { inStock, isSale } = computeDerivedFields(data);
        const result = await getPool().query(
            `INSERT INTO products (type, name, price, original_price, quantity, description, about_product, images, reviews, in_stock, is_sale)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING *`,
            [
                data.type,
                data.name,
                data.price,
                data.originalPrice || null,
                data.quantity ?? 0,
                data.description,
                data.aboutProduct || '',
                JSON.stringify(data.images || []),
                JSON.stringify(data.reviews || []),
                inStock,
                isSale,
            ]
        );
        return toProduct(result.rows[0]);
    },

    async findByIdAndUpdate(id, data) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) return null;
        const { inStock, isSale } = computeDerivedFields(data);
        const result = await getPool().query(
            `UPDATE products
             SET type = $1, name = $2, price = $3, original_price = $4, quantity = $5,
                 description = $6, about_product = $7, images = $8, reviews = $9, in_stock = $10, is_sale = $11
             WHERE id = $12
             RETURNING *`,
            [
                data.type,
                data.name,
                data.price,
                data.originalPrice || null,
                data.quantity ?? 0,
                data.description,
                data.aboutProduct || '',
                JSON.stringify(data.images || []),
                JSON.stringify(data.reviews || []),
                inStock,
                isSale,
                numericId,
            ]
        );
        return toProduct(result.rows[0]);
    },

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
