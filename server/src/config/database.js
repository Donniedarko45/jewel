import pg from 'pg';

const { Pool } = pg;

let pool;

// Get or create the pool (lazy initialization so dotenv has time to load)
const getPool = () => {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }
    return pool;
};

// Initialize database tables
const initDB = async () => {
    const client = await getPool().connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                type VARCHAR(20) NOT NULL CHECK (type IN ('bracelet', 'pendant')),
                name VARCHAR(255) NOT NULL,
                price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
                original_price NUMERIC(10,2) DEFAULT NULL CHECK (original_price IS NULL OR original_price >= 0),
                quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
                description TEXT NOT NULL,
                about_product TEXT DEFAULT '',
                images JSONB DEFAULT '[]'::jsonb,
                reviews JSONB DEFAULT '[]'::jsonb,
                in_stock BOOLEAN DEFAULT true,
                is_sale BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        // Create a trigger to auto-update updated_at
        await client.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        `);

        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_trigger WHERE tgname = 'update_products_updated_at'
                ) THEN
                    CREATE TRIGGER update_products_updated_at
                        BEFORE UPDATE ON products
                        FOR EACH ROW
                        EXECUTE FUNCTION update_updated_at_column();
                END IF;
            END;
            $$;
        `);

        // Add new columns to existing tables (safe - IF NOT EXISTS)
        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='about_product') THEN
                    ALTER TABLE products ADD COLUMN about_product TEXT DEFAULT '';
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='reviews') THEN
                    ALTER TABLE products ADD COLUMN reviews JSONB DEFAULT '[]'::jsonb;
                END IF;
            END
            $$;
        `);

        // Seeding database with anti-dummy items
        const seedProducts = [
            {
                type: 'pendant',
                name: 'Anti-Tarnish Initial Pendant Neckpiece',
                price: 190.00,
                original_price: 280.00,
                quantity: 15,
                description: 'Material: 925 Sterling Silver\nFinish: 18K Gold Plated\nStyle: Personalized Luxury\nDesign: Minimalist Letter Carving with Delicate Chain\nIdeal For: Women & Girls\nOccasion: Everyday Elegance, Birthday Gift\nFeatures: Anti-Tarnish, Water-Resistant, Delicate Link Chain',
                about_product: 'Add a personal touch to your style with our anti-tarnish initial pendant neckpiece. Crafted from premium sterling silver with a thick gold plating, it offers long-lasting everyday elegance.',
                images: JSON.stringify([
                    {
                        url: 'https://res.cloudinary.com/die8tcfj1/image/upload/v1764785960/1764440232861_lrvgt3.png',
                        publicId: 'jewel/products/fallback-pendant-1'
                    }
                ]),
                reviews: JSON.stringify([]),
                in_stock: true,
                is_sale: true
            },
            {
                type: 'pendant',
                name: 'Celestial Sun & Moon Duo Pendant',
                price: 240.00,
                original_price: 360.00,
                quantity: 10,
                description: 'Material: 316L Stainless Steel\nFinish: Two-Tone Silver & Gold Plated\nStyle: Mystical Modern\nDesign: Interlocking Sun and Crescent Moon Motif\nIdeal For: Unisex\nOccasion: Casual Wear, Unique Gifting\nFeatures: Anti-Tarnish, Sweatproof, Lead & Nickel Free',
                about_product: 'A stunning celestial sun and moon duo pendant representing balance and harmony. Designed with a premium two-tone finish and anti-tarnish protection, it remains bright under daily use.',
                images: JSON.stringify([
                    {
                        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
                        publicId: 'jewel/products/fallback-pendant-2'
                    }
                ]),
                reviews: JSON.stringify([]),
                in_stock: true,
                is_sale: false
            },
            {
                type: 'pendant',
                name: 'Vintage Emerald Cut Solitaire Pendant',
                price: 380.00,
                original_price: 550.00,
                quantity: 8,
                description: 'Material: 925 Sterling Silver\nFinish: Platinum Rhodium Plated\nStyle: Heritage Luxury\nDesign: Emerald-Cut Cubic Zirconia Solitaire\nIdeal For: Women\nOccasion: Formal Wear, Festive, Anniversary\nFeatures: Premium Sparkle, Anti-Tarnish, Anti-Oxidant Coating',
                about_product: 'Inspired by vintage heritage glamour, this emerald-cut solitaire pendant shines with brilliant intensity. Perfect for elevating formal dresses or festive looks.',
                images: JSON.stringify([
                    {
                        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
                        publicId: 'jewel/products/fallback-pendant-3'
                    }
                ]),
                reviews: JSON.stringify([]),
                in_stock: true,
                is_sale: false
            }
        ];

        for (const product of seedProducts) {
            const check = await client.query('SELECT 1 FROM products WHERE name = $1', [product.name]);
            if (check.rows.length === 0) {
                await client.query(
                    `INSERT INTO products (type, name, price, original_price, quantity, description, about_product, images, reviews, in_stock, is_sale)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                    [
                        product.type,
                        product.name,
                        product.price,
                        product.original_price,
                        product.quantity,
                        product.description,
                        product.about_product,
                        product.images,
                        product.reviews,
                        product.in_stock,
                        product.is_sale
                    ]
                );
                console.log(`Seeded database product: ${product.name}`);
            }
        }

        console.log('PostgreSQL connected & tables initialized');
    } catch (error) {
        console.error(`Database Eravni144ror: ${error.message}`);
        throw error;
    } finally {
        client.release();
    }
};

const connectDB = async () => {
    await initDB();
};

export { getPool };
export default connectDB;
