// Check existing tables in the database
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Pool } = require('pg');
require('dotenv').config({ path: '../.Env' });

const connectionString = process.env.DATABASE_URL;

console.log('Connecting to:', connectionString.split('@')[1].split('?')[0]);

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function checkTables() {
  try {
    const client = await pool.connect();
    
    // Check for existing tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\nExisting tables in database:');
    if (result.rows.length === 0) {
      console.log('  (no tables found)');
    } else {
      result.rows.forEach(row => {
        console.log('  - ' + row.table_name);
      });
    }
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

checkTables();
