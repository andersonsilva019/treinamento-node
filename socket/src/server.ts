import express from 'express';
import path from 'path';
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express();

const server = createServer(app);

app.use(express.static(path.join(__dirname, '..', 'public')));

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
})

app.get('/', (req, res) => {
  return res.send('Hello World!');
})

server.listen(3000, () => console.log('Server started on port 3000'));