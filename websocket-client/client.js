// cliente.js
const io = require('socket.io-client');

// Reemplaza el valor con un token JWT válido
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwic3ViIjoxLCJpYXQiOjE3MjU0ODgzMTMsImV4cCI6MTcyNTQ5MTkxM30.uR5734MwLHwkBFM-gAmSv5cX-38Nl3N51jLuuMqStxg';

const socket = io('http://localhost:3000', {
  auth: {
    token: token, // Aquí envías el token JWT
  },
});


socket.on('connect', () => {
  console.log('Connected to server');

  // Enviar un mensaje
  socket.emit('message', { user: 'user', message: 'Hello, user! Im Usertest' });
});

// Escuchar mensajes
socket.on('message', (data) => {
  console.log('New message:', data);
});
