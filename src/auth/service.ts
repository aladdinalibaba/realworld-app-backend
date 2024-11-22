import bcrypt from 'bcrypt';
import userService from '../user/service';

async function verifyUser(email: string, pass: string) {
  const user = await userService.findOne({
    where: { email },
  });

  if (user) {
    const isMatch = await bcrypt.compare(pass, user.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;

    if (isMatch) {
      return data;
    }
  }

  return null;
}

export default { verifyUser };
