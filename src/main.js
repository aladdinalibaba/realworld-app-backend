import express from 'express';
import config from './config.js';
import user from './user/controller.js';

const app = express();

app.use(express.json());

app.listen(config.port, () => {
  console.log(`Listening on localhost:${config.port}`);
});

app.get('/users', user.getAll);

app.get('/', (req, res) => {
  res.send('Hello World');
});
