import { FindManyOptions, FindOneOptions } from 'typeorm';
import HttpException from '../util/exception';
import dataSource from '../data-source';
import User from './entity';

const userRepo = dataSource.getRepository(User);

async function create({ email, ...rest }: Partial<User>) {
  const lowerEmail = email!.toLowerCase();

  const [isDupEmail, isDupName] = await Promise.all([
    userRepo.findOneBy({ email: lowerEmail }),
    userRepo.findOneBy({ username: rest.username }),
  ]);

  if (isDupEmail) {
    throw new HttpException('Already have email', 400);
  }
  if (isDupName) {
    throw new HttpException('Already have username', 400);
  }

  const newUser = userRepo.create({ ...rest, email: lowerEmail });

  return userRepo.save(newUser);
}

function find(options?: FindManyOptions<User>) {
  return userRepo.find(options);
}

function findOne(options: FindOneOptions<User>) {
  return userRepo.findOne(options);
}

async function follow(id1: number, id2: number) {
  if (id1 === id2) {
    throw new HttpException('You cannot follow yourself', 400);
  }

  const [user1, user2] = await Promise.all([
    userRepo.findOne({ where: { id: id1 }, relations: ['following'] }),
    userRepo.findOneBy({ id: id2 }),
  ]);

  if (!user2 || !user1) {
    throw new HttpException(`User id ${id2} not found`, 404);
  }

  user1.following.push(user2);

  return userRepo.save(user1);
}

async function unFollow(id1: number, id2: number) {
  if (id1 === id2) {
    throw new HttpException('You cannot follow yourself', 400);
  }

  const [user1, user2] = await Promise.all([
    userRepo.findOne({ where: { id: id1 }, relations: ['following'] }),
    userRepo.findOneBy({ id: id2 }),
  ]);

  if (!user2 || !user1) {
    throw new HttpException(`User id ${id2} not found`, 404);
  }

  user1.following = user1.following.filter((v) => v.id !== user2.id);

  return userRepo.save(user1);
}

export default { create, find, findOne, follow, unFollow };
