import { pipeline, Readable, Transform, Writable } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

const readableStream = new Readable({
  read() {
    for (let i = 1; i <= 1e5; i++) {
      const person = { id: Date.now() + i, name: `Anderson-${i}` };
      const data = JSON.stringify(person) + '\n';
      this.push(data);
    }
    this.push(null)
  }
})

const tranformStream = new Transform({
  transform(chunk, encoding, callback) {
    const person = JSON.parse(chunk.toString());
    const data = `${person.id},${person.name}\n`;
    callback(null, data);
  }
})

const writableStream = new Writable({
  write: (chunk, encoding, callback) => {
    console.log(chunk.toString())
    callback()
  }
})

await pipelineAsync(
  readableStream,
  tranformStream,
  writableStream
)