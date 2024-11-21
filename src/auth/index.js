import controller from './controller.js';
import { localAuth } from './middleware.js';
import { reqValidator } from '../middleware.js';
import { loginSchema } from './filter.js';

export default [
  {
    path: '/auth/login',
    method: 'post',
    middlewares: [reqValidator(loginSchema), localAuth],
    handler: controller.login,
  },
];
