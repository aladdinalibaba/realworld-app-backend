import controller from './controller.js';
import HttpException from '../util/exception.js';

export default [
  {
    path: '/users',
    method: 'get',
    handler: controller.getAll,
  },
];
