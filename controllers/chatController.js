const db = require('../config/db');

// GET messages between two users
exports.getMessages = (req, res) => {
  const { senderId, receiverId } = req.query;

  const query = `
    SELECT *, sender_id = ? AS isSender              
    FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY timestamp ASC
  `;

  db.query(query, [senderId, senderId, receiverId, receiverId, senderId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch messages' });
    res.json(results);
  });
};

// POST new message
exports.sendMessage = (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message)
    return res.status(400).json({ error: 'Missing fields' });

  const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  db.query(query, [senderId, receiverId, message], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to send message' });
    res.json({ message: 'Message sent', id: result.insertId });
  });
};
