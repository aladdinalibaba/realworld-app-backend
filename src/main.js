import express from 'express';
import config from './config.js';
import tryCatch from './util/try-catch.js';
import userModule from './user/index.js';

const app = express();

app.use(express.json());

app.listen(config.port, () => {
  console.log(`Listening on localhost:${config.port}`);
});

const appRouter = [
  ...userModule,
  {
    path: '/ping',
    method: 'get',
    handler: (req, res) => res.send('pong'),
  },
];

appRouter.forEach(({ path, method, handler, middlewares = [] }) => {
  app[method](path, [...middlewares, handler].map(tryCatch));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      message: err.message || 'Something went wrong',
    },
  });
});
