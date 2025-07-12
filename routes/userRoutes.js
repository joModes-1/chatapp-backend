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

const upload = require('../middlewares/uploads'); // Multer middleware

router.post('/register', upload.single('profile_url'), registerUser);
router.post('/login',loginUser);
router.post('/logout', LogoutUser);
router.post('/Deactivate', Deactivate); 

router.get('/users', getAllUsers); // GET /users to fetch all users
router.get('/search', searchUsers);

router.put('/users/update/:id', upload.single('profile_url'), updateUser);

module.exports = router;
