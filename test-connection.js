const mysql = require('mysql2');

// Create MySQL connection (no DB yet)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aakash@159'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL server.');

  // Create DB if not exists
  db.query(`CREATE DATABASE IF NOT EXISTS chatapp`, (err) => {
    if (err) {
      console.error('❌ Database creation failed:', err.message);
      return;
    }
    console.log('✅ Database "chatapp" ready.');

    // Switch to chatapp DB
    db.changeUser({ database: 'chatapp' }, (err) => {
      if (err) {
        console.error('❌ Failed to switch to chatapp DB:', err.message);
        return;
      }

      // Create users table
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          mobile VARCHAR(15) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          profile_url VARCHAR(255) DEFAULT 'default.jpeg'
        )
      `;


      db.query(createUsersTable, (err) => {
        if (err) {
          console.error('❌ Users table creation failed:', err.message);
          return;
        }
        console.log('✅ "users" table ready.');

        // Create messages table
        const createMessagesTable = `
          CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sender_id INT NOT NULL,
            receiver_id INT NOT NULL,
            message TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
          )
        `;

        db.query(createMessagesTable, (err) => {
          if (err) {
            console.error('❌ Messages table creation failed:', err.message);
            return;
          }
          console.log('✅ "messages" table ready.');
          db.end(); // Close connection after setup
        });
      });
    });
  });
});
