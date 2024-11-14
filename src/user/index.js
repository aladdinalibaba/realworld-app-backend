import controller from './controller.js';

export default [
  {
    path: '/users',
    method: 'post',
    handler: controller.create,
  },
  {
    path: '/users',
    method: 'get',
    handler: controller.getAll,
  },
];
