import { Strategy } from 'passport-local';
import passport from '../passport.js';
import authModel from './model.js';
import HttpException from '../util/exception.js';

passport.use(
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, pass, cb) => {
      const user = await authModel.verifyUser(email, pass);

      if (!user) {
        cb(new HttpException('Invalid credentials', 401));
      } else {
        cb(null, user);
      }
    },
  ),
);

const localAuth = passport.authenticate('local', { session: false });

export default { localAuth };
