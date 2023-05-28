
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:4200');

// Listen for the 'connect' event, which is triggered when the client successfully connects to the server
socket.on('connect', () => {
  console.log('Connected to the server');
});

// Listen for the 'newMessage' event, which is emitted by the server when a new message is received
socket.on('newMessage', (message) => {
  console.log('New message:', message);
  // Handle the new message (e.g., update the UI, display a notification)
});

// Send a new message to the server
export function sendMessage(sender, content){
  // Emit the 'sendMessage' event to the server with the message data
  socket.emit('sendMessage', { sender, content });
};
