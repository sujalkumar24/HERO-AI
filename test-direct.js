// Test DIRECT_URL for migrations (port 5432)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Pool } = require('pg');
require('dotenv').config({ path: './.Env' });

const connectionString = process.env.DIRECT_URL;

console.log('Testing DIRECT_URL:', connectionString.split('@')[1]);

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function testConnection() {
  console.log('\n--- Testing DIRECT_URL (port 5432 for migrations) ---');
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ DIRECT_URL connected successfully!');
    console.log('Current time:', result.rows[0].now);
    client.release();
    await pool.end();
    console.log('\n✅ DIRECT_URL test passed! Ready for migrations.');
  } catch (error) {
    console.error('❌ DIRECT_URL connection failed:', error.message);
    await pool.end();
    process.exit(1);
  }
}

testConnection();
