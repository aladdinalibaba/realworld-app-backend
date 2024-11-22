import { reqValidator } from '../middleware';
import { Router } from '../types';
import { createSchema } from './filter';
import userService from './service';

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
      res.send({ data: await userService.find() });
    },
  },
] as Router[];
