import { io } from '../http';

io.on('connect', (socket) => {
  socket.emit('chat_start', {
    message: 'Welcome to the chat!'
  })
})