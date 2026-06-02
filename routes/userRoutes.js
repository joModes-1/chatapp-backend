const express = require('express');
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  loginUser,
  LogoutUser,
  searchUsers,
  updateUser,
  Deactivate
} = require('../controllers/userControllers');

const upload = require('../middlewares/uploads');

// Authentication Routes
router.post('/register', upload.single('profile_url'), registerUser);
router.post('/login', loginUser);
router.post('/logout', LogoutUser);

// User Management Routes
router.get('/users', getAllUsers);
router.get('/search', searchUsers);

// Update User
router.put('/users/:id', upload.single('profile_url'), updateUser);

// Deactivate User
router.patch('/users/:id/deactivate', Deactivate);

module.exports = router;
