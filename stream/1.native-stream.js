// // Pega tudo do stdin e manda para o stdout
// process.stdin.pipe(process.stdout);

// Terminal servidor
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(3333)";

// Terminal cliente
// node -e "process.stdin.pipe(require('net').connect(3333))";

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http';
import { createReadStream, readFileSync } from 'fs'
http.createServer((req, res) => {
  // const file = readFileSync('big.file');
  // res.write(file);
  // res.end();

  createReadStream('big.file').pipe(res);

}).listen(3333, () => console.log('Servidor rodando na porta 3333'));

// curl localhost:3333 -o out.txt