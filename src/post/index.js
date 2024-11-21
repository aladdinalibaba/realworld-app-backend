import controller from './controller.js';
import { authenticate } from '../auth/middleware.js';
import { reqValidator } from '../middleware.js';
import { createSchema, addTagsSchema } from './filter.js';

export default [
  {
    path: '/posts',
    method: 'post',
    middlewares: [authenticate, reqValidator(createSchema)],
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
    middlewares: [authenticate, reqValidator(addTagsSchema)],
  },
];
