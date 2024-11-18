import controller from './controller.js';
import { authenticate } from '../auth/middleware.js';

export default [
  {
    path: '/posts',
    method: 'post',
    middlewares: [authenticate],
    handler: controller.create,
  },
  {
    path: '/posts',
    method: 'get',
    handler: controller.findAll,
  },
  {
    path: '/posts/:postId/tags',
    method: 'post',
    handler: controller.addTags,
    middlewares: [authenticate],
  },
];
