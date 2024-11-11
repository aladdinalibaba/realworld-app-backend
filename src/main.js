import express from 'express';

const PORT = 5002;

const app = express();

app.use(express.json());

app.listen(PORT, console.log(`Listening on localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send('Hello World');
});
