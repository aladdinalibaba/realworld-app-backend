import bcrypt from 'bcrypt';
import userService from '../user/service.js';

async function verifyUser(email, password) {
  const user = await userService.findOne({
    where: { email },
  });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    delete user.password;

    if (isMatch) {
      return user;
    }
  }

  return null;
}

export default { verifyUser };
