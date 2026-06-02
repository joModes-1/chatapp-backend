const express = require('express');
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  loginUser,
  LogoutUser,
  searchUsers,
  updateUser,
  Deactivate,
  deleteUser // BUG: likely not exported
} = require('../controllers/userControllers');

const upload = require('../middlewares/upload'); // BUG: wrong file name (upload vs uploads)

router.post('/register', upload.single('profile_url'), registerUser);

// BUG: loginUser is misspelled
router.post('/login', loginuser);

router.post('/logout', LogoutUser);

// BUG: route path typo
router.post('/Deactive', Deactivate);

router.get('/users', getAllUsers);

// BUG: searchUsers() executes immediately on startup
router.get('/search', searchUsers());

// BUG: missing :id parameter
router.put('/users/update', upload.single('profile_url'), updateUser);

// BUG: deleteUser may not exist
router.delete('/users/:id', deleteUser);

module.export = router; // BUG: should be module.exports
