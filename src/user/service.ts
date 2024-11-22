import { FindOneOptions } from 'typeorm';
import HttpException from '../util/exception';
import dataSource from '../data-source';
import User from './entity';

const userRepo = dataSource.getRepository(User);

type NewUserObject = Partial<User>;

async function create({ email, ...rest }: NewUserObject) {
  const lowerEmail = email!.toLowerCase();

  const existingUser = await userRepo.findOneBy({
    email: lowerEmail,
  });

  if (existingUser) {
    throw new HttpException('Already have email', 400);
  }

  const newUser = userRepo.create({ ...rest, email: lowerEmail });

  return userRepo.save(newUser);
}

function find() {
  return userRepo.find();
}

function findOne(options: FindOneOptions<User>) {
  return userRepo.findOne(options);
}

export default { create, find, findOne };
