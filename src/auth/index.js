import controller from './controller.js';
import { localAuth } from './middleware.js';

export default [
  {
    path: '/auth/login',
    method: 'post',
    middlewares: [localAuth],
    handler: controller.login,
  },
];
