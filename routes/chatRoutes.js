const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');


// app.use('/uploads', express.static('uploads'));

// Get messages route
router.get('/messages', chatController.getMessagese);



// Post message route
router.post('/send', (req, res) => {
  chatController.sendMessages(req, res, req.io);
});


module.exports = router;


