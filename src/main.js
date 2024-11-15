import express from 'express';
import session from 'express-session';
import passport from './passport.js';
import config from './config.js';
import tryCatch from './util/try-catch.js';
import userModule from './user/index.js';
import authModule from './auth/index.js';

const app = express();

app.use(express.json());
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
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

const appRouter = [
  ...userModule,
  ...authModule,
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
  const status = err.statusCode || 500;

  res.status(status).json({
    error: {
      message: err.message || 'Something went wrong',
    },
  });
});
