import controller from './controller.js';
import { authenticate } from '../auth/middleware.js';
import { reqValidator } from '../middleware.js';
import { createSchema } from './filter.js';

export default [
  {
    path: '/users',
    method: 'post',
    handler: controller.create,
    middlewares: [reqValidator(createSchema)],
  },
  {
    path: '/users',
    method: 'get',
    handler: controller.getAll,
  },
  {
    path: '/users/:userId',
    method: 'get',
    handler: controller.getOne,
  },
  {
    path: '/follow/:userId',
    method: 'post',
    handler: controller.follow,
    middlewares: [authenticate],
  },
  {
    path: '/follow/:userId',
    method: 'delete',
    handler: controller.unFollow,
    middlewares: [authenticate],
  },
];
