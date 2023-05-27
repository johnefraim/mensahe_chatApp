const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const credentials = req.body;

  try {
    const user = await authController.login(credentials);
    console.log(user);
    // Send a success response with the user object or any other relevant data
    res.json(user);
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
