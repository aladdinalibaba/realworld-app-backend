import controller from './controller.js';
import { authenticate } from '../auth/middleware.js';

export default [
  {
    path: '/users',
    method: 'post',
    handler: controller.create,
  },
  {
    path: '/users',
    method: 'get',
    middlewares: [authenticate],
    handler: controller.getAll,
  },
];
