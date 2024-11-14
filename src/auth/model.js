import bcrypt from 'bcrypt';
import userModel from '../user/model.js';

async function verifyUser(email, password) {
  const user = await userModel.findOne({
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
