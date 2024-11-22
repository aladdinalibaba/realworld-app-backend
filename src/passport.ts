import passport from 'passport';
import userService from './user/service';
import User from './user/entity';

passport.serializeUser((user: Partial<User>, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await userService.findOne({
    where: { id },
  });

  done(null, user);
});

export default passport;
