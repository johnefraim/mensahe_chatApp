const User = require('../Models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance with the hashed password
    const user = new User({ name, email, password: hashedPassword });
    
    // Save the user to the database
    await user.save();
    const data = res.sendStatus(200);
    console.log(data);
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = { register };
