import controller from './controller.js';
import middleware from './middleware.js';

export default [
  {
    path: '/auth/login',
    method: 'post',
    middlewares: [middleware.localAuth],
    handler: controller.login,
  },
];
