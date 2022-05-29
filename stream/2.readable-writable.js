import {
  // Fonte de dados de onde será lido os dados
  Readable,
  // Saída de dados para onde serão escritos os dados
  Writable
} from 'stream'

// Fonte de dados de onde será lido os dados
const readable = new Readable({
  read() {
    this.push('Hello 1');
    this.push('Hello 2');
    this.push('Hello 3');

    // O Readable stream parou de enviar dados
    this.push(null);
  }
})

// Saída de dados para onde serão escritos os dados
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
})

readable
  // Writeable stream para onde serão escritos os dados -> imprimir, gravar, etc
  .pipe(writable);