const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./Models/User');
const { Message } = require('./Models/message');
const registrationController = require('./controller/registrationController');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

// Connect to MongoDBls

mongoose
  .connect('mongodb://localhost:27017/chatapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Registration route
app.post('/api/register', registrationController.register);

// Login route
app.post('/api/login', authRoutes);

// Get all the contacts in the database
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await User.find();
    res.json(contacts);
  } catch (error) {
    console.log('Error reading database:', error);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

app.get('/api/chatHistory', async (req, res) => {
  try {
    const chatHistory = await Message.find();
    res.json(chatHistory);
  } catch (error) {
    console.log('Error reading chat history:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
});

app.get('/', async (req, res) => {
  res.json('hello');
});

// Start the server
const port = 4200;
const server = http.createServer(app); // Create an HTTP server using Express app
const io = new Server(server, { // Initialize Socket.IO using the HTTP server
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A new client has connected');

  // Handle when a client sends a new message
  socket.on('sendMessage', async (data) => {
    try {
      const { sender, content } = data;

      // Create a new message instance
      const message = new Message({ sender, content });
      // Save the message to the database
      await message.save();

      // Emit the new message to all connected clients except the sender
      socket.broadcast.emit('newMessage', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle when a client disconnects
  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
