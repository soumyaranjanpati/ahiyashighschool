
import mysql from 'mysql2/promise';

// Basic configuration check
if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DATABASE) {
  console.warn(
    'Missing required MySQL environment variables (MYSQL_HOST, MYSQL_USER, MYSQL_DATABASE). Database operations might fail.'
  );
}

// Create a connection pool
// Using a pool is recommended for managing connections efficiently
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// Optional: Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL database.');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
    // You might want to handle this more gracefully, e.g., prevent app startup
  });


export default pool;
