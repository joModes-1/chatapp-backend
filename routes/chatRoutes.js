const express = require('express');
const router = express.Router();

const chatController = require('../controller/chatController'); // BUG 1: wrong folder name

// Post message route
router.post('/send', (req, res) => {
  chatController.sendMessage(req, res, req.socketIo); // BUG 2: wrong function name
                                                    // BUG 3: wrong io property
});

// BUG 4: duplicate route
router.post('/send', (req, res) => {
  res.json({ message: 'Duplicate route' });
});

// BUG 5: typo in route path
router.get('/messagess', chatController.getMessages);

// BUG 6: wrong controller name
router.get('/messages', chatController.getMessagese);

// BUG 7: missing callback
router.delete('/messages');

// BUG 8: route never ends request
router.get('/hanging', (req, res) => {
  console.log('Request received');
});

// BUG 9: crash route
router.get('/crash', (req, res) => {
  throw new Error('Intentional crash');
});

// BUG 10: undefined variable
router.get('/undefined', (req, res) => {
  res.json(testData);
});

// BUG 11: infinite recursion
router.get('/loop', (req, res) => {
  function recurse() {
    recurse();
  }
  recurse();
});

// BUG 12: wrong export
module.export = router;
