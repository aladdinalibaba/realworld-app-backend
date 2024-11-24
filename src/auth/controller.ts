import { reqValidator } from '../middleware';
import type { Router } from '../types/router';
import { loginSchema } from './validation';
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
