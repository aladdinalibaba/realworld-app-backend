import { Strategy } from 'passport-local';
import { Handler } from 'express';
import passport from '../passport';
import authService from './service';
import HttpException from '../util/exception';

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

const authenticate: Handler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new HttpException('You must sign in', 400);
  }

  next();
};

export { localAuth, authenticate };
