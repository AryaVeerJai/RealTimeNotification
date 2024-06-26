const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const port = 3000;

// Self-signed certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert')),
};

const server = https.createServer(options, app);
const io = socketIo(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send a notification to the client every 5 seconds
  setInterval(() => {
    socket.emit('notification', { message: 'This is a real-time notification!' });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
