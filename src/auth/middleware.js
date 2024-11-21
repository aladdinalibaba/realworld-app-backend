import { Strategy } from 'passport-local';
import passport from '../passport.js';
import authService from './service.js';
import HttpException from '../util/exception.js';

passport.use(
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, pass, cb) => {
      const user = await authService.verifyUser(email, pass);

      if (!user) {
        cb(new HttpException('Invalid credentials', 401));
      } else {
        cb(null, user);
      }
    },
  ),
);

const localAuth = passport.authenticate('local');

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    throw new HttpException('You must sign in', 400);
  }

  next();
}

function validate(schema) {
  return (req, res, next) => {
    schema
      .validate(req.body, { abortEarly: false })
      .then(() => next())
      .catch((err) => {
        next(new HttpException('Invalid input', 400, err.errors));
      });
  };
}

export { localAuth, authenticate, validate };
