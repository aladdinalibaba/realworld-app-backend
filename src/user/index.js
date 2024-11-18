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
  {
    path: '/users/:userId',
    method: 'get',
    handler: controller.getOne,
  },
];
