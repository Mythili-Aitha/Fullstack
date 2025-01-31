import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

// ✅ Function to Fetch Data from MySQL
export async function getNotifications() {
  try {
      const [result] = await pool.query(`SELECT * FROM notifications`);
      return result;
  } catch (error) {
      console.error("Error in getNotes:", error);
      throw error;
  }
}

// ✅ Check for missing environment variables
if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE) {
  console.error("Missing environment variables! Check your .env file.");
  process.exit(1);
}
