const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (credentials) => {
  try {
    const { email, password } = credentials;

    // Find the user with the provided username
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Login failed');
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Login failed');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Return the user object and token
    return {
      user,
      token,
    };
  } catch (error) {
    throw new Error('Login failed');
  }
};

module.exports = {
  login,
};
