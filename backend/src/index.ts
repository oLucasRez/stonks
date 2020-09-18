import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (_, res) => res.send({ msg: 'Hello world' }));

export function sum(x: number, y: number) {
  return x + y;
}

app.listen(4000);
