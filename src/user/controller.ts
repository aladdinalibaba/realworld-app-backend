import { authenticate } from '../auth/middleware';
import { reqValidator, parseIntPipe } from '../middleware';
import type { Router } from '../types/router';
import { createSchema } from './validation';
import userService from './service';
import User from './entity';

export default [
  {
    path: '/users',
    method: 'post',
    middlewares: [reqValidator(createSchema)],
    handler: async (req, res) => {
      const { body } = req;

      const data = await userService.create(body);

      res.status(201).json({ data });
    },
  },
  {
    path: '/users',
    method: 'get',
    handler: async (req, res) => {
      const data = await userService.find({
        relations: ['posts', 'followers', 'following'],
      });

      res.send({ data });
    },
  },
  {
    middlewares: [authenticate, parseIntPipe('id')],
    path: '/follow/:id',
    method: 'post',
    handler: async (req, res) => {
      const { id } = req.user as Partial<User>;
      const targetId = +req.params.id;

      const data = await userService.follow(id!, targetId);

      res.send({ data });
    },
  },
  {
    middlewares: [authenticate, parseIntPipe('id')],
    path: '/follow/:id',
    method: 'delete',
    handler: async (req, res) => {
      const { id } = req.user as Partial<User>;
      const targetId = +req.params.id;

      const data = await userService.unFollow(id!, targetId);

      res.send({ data });
    },
  },
] as Router[];
