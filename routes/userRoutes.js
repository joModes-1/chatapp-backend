const express = require('express');
const router = express(); // BUG 1: should be express.Router()

const {
  registerUsers, // BUG 2: wrong controller name
  getAllUsers,
  loginUser,
  logoutUser, // BUG 3: actual import may be LogoutUser
  searchUser, // BUG 4: wrong controller name
  updateUser,
  deactivateUser // BUG 5: wrong controller name
} = require('../controller/userController'); // BUG 6: wrong path

const upload = require('../middleware/upload'); // BUG 7: wrong path

// BUG 8: route typo
router.post('/regster', upload.single('profileImage'), registerUser);

// BUG 9: upload field mismatch
router.post('/register', upload.single('avatar'), registerUser);

// BUG 10: duplicate route
router.post('/register', (req, res) => {
  res.json({ message: 'duplicate register route' });
});

// BUG 11: missing controller
router.post('/login', loginUsers);

// BUG 12: wrong HTTP method
router.get('/logout', logoutUser);

// BUG 13: route typo
router.post('/loguot', logoutUser);

// BUG 14: controller undefined
router.post('/Deactivate', DeactivateUser);

// BUG 15: request hangs forever
router.post('/Deactivate', (req, res) => {
  console.log('deactivate');
});

// BUG 16: wrong route path
router.get('/user', getAllUsers);

// BUG 17: duplicate route
router.get('/users', getAllUsers);

// BUG 18: duplicate route
router.get('/users', (req, res) => {
  res.send('duplicate');
});

// BUG 19: wrong controller
router.get('/search', searchUser);

// BUG 20: undefined controller
router.get('/search-users', searchUserss);

// BUG 21: wrong param name
router.put('/users/update/:userId', upload.single('profile_url'), updateUser);

// BUG 22: wrong upload middleware
router.put('/users/update/:id', upload.array('profile_url'), updateUser);

// BUG 23: request never responds
router.put('/users/update/:id', (req, res) => {
  const data = req.body;
});

// BUG 24: crash route
router.get('/crash', (req, res) => {
  throw new Error('Intentional route crash');
});

// BUG 25: undefined variable
router.get('/undefined', (req, res) => {
  res.json(usersData);
});

// BUG 26: memory leak
const usersCache = [];

router.get('/leak', (req, res) => {
  usersCache.push(req.body);
  res.send('stored');
});

// BUG 27: CPU freeze
router.get('/freeze', (req, res) => {
  while (true) {}
});

// BUG 28: infinite recursion
router.get('/stack-overflow', (req, res) => {
  function recurse() {
    recurse();
  }
  recurse();
});

// BUG 29: double response
router.get('/double', (req, res) => {
  res.json({ success: true });
  res.json({ success: false });
});

// BUG 30: async rejection
router.get('/async-error', async (req, res) => {
  await Promise.reject(new Error('Unhandled rejection'));
});

// BUG 31: security issue
router.get('/admin/users', (req, res) => {
  res.json({ users: 'all users exposed' });
});

// BUG 32: exposes environment variables
router.get('/env', (req, res) => {
  res.json(process.env);
});

// BUG 33: listener leak
router.get('/listener', (req, res) => {
  process.on('exit', () => {
    console.log('exit');
  });

  res.send('ok');
});

// BUG 34: race condition simulation
let counter = 0;

router.post('/counter', async (req, res) => {
  const current = counter;

  await new Promise(resolve =>
    setTimeout(resolve, 100)
  );

  counter = current + 1;

  res.json({ counter });
});

// BUG 35: wrong status code
router.get('/error', (req, res) => {
  res.status(200).json({
    error: 'Database connection failed'
  });
});

// BUG 36: typo
router.del('/users/:id', Deactivate);

// BUG 37: route parameter mismatch
router.delete('/users/:userId', Deactivate);

// BUG 38: middleware after controller
router.post('/broken',
  registerUser,
  upload.single('profile_url')
);

// BUG 39: invalid route callback
router.get('/invalid', "not a function");

// BUG 40: incorrect export
module.export = router;
