import { reqValidator } from '../middleware';
import { Router } from '../types';
import { loginSchema } from './filter';
import { localAuth } from './middleware';

export default [
  {
    middlewares: [reqValidator(loginSchema), localAuth],
    path: '/auth/login',
    method: 'post',
    handler: async (req, res) => {
      res.json({
        data: req.user,
      });
    },
  },
] as Router[];
