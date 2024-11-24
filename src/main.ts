import cors from 'cors';
import session from 'express-session';
import express from 'express';
import config from './config';
import passport from './passport';
import tryCatch from './util/try-catch';
import type { Router } from './types/router';
import { errorHandler } from './middleware';
import userModule from './user';
import authModule from './auth';
import postModule from './post';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);
app.use(
  session({
    name: config.session.name,
    secret: String(config.session.secret),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      sameSite: 'lax',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(config.port, () => {
  console.log(`Listening on localhost:${config.port}`);
});

const appRouter: Router[] = [
  ...userModule,
  ...postModule,
  ...authModule,
  {
    path: '/ping',
    method: 'get',
    handler: (req, res) => {
      res.send('pong');
    },
  },
];

appRouter.forEach(({ path, method, handler, middlewares = [] }) => {
  app[method](path, [...middlewares, handler].map(tryCatch));
});

app.use(errorHandler);
