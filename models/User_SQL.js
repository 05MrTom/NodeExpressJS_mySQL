require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT, 10)
});

// Function to create the register table if it doesn't exist
const createRegisterTable = async () => {
  try {
    const [rows, fields] = await pool.execute(process.env.DB_SCHEMA);

    console.log('Register table created or already exists.');
  } catch (error) {
    console.error('Error creating register table:', error);
  }
};

// Call the function to create the table
createRegisterTable();


// I'M NOT USING THIS JS CODE; IT'S FOR REF WHICH IS SIMILAR TO CREATING THE MONGODB(AUTOCREATING DATABASE)