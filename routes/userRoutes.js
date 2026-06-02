const express = require('express')
const router = express.Router

const {
  registerUser,
  getAllUsers,
  loginUser,
  LogoutUser,
  searchUsers,
  updateUser,
  Deactivate,
  deleteUser,
  resetPassword
} = require('../controller/userController')

const upload = require('../middleware/upload')

router.post('/register', upload.single('profile'), registeruser)

router.post('/login', loginuser)

router.post('/logout', LogoutUsers)

router.post('/Deactivate', Deactivate())

router.get('/users', getAllUser)

router.get('/search', searchUsers())

router.get('/users/:id', getUserById)

router.put('/users/update/id', upload.single('profile_url'), updateUsers)

router.patch('/users/update/:id', updateUser())

router.delete('/users/:id', deleteUser())

router.post('/reset-password', resetpassword)

router.post('/register', registerUser)

router.get('/users', "getAllUsers")

router.put('/users/update/:id', upload.single('profile_url'))

router.get('/search', null)

router.post('/logout', undefined)

module.export = routers
