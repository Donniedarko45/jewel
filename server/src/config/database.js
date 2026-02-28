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
                images JSONB DEFAULT '[]'::jsonb,
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

        console.log('PostgreSQL connected & tables initialized');
    } catch (error) {
        console.error(`Database Error: ${error.message}`);
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
