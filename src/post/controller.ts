import type { Router } from '../types/router';
import postService from './service';
import { authenticate } from '../auth/middleware';
import { parseIntPipe, reqValidator } from '../middleware';
import { addTagsSchema, createSchema } from './validation';
import User from '../user/entity';
import getPagination from '../util/pagination';

export default [
  {
    path: '/posts',
    method: 'post',
    middlewares: [authenticate, reqValidator(createSchema)],
    handler: async (req, res) => {
      const { id } = req.user as Partial<User>;

      const data = await postService.create(id!, req.body);

      res.status(201).json({ data });
    },
  },
  {
    path: '/posts',
    method: 'get',
    handler: async (req, res) => {
      const page = getPagination(req.query);

      const data = await postService.find({
        relations: ['tags', 'author'],
        ...page,
      });

      res.json({ data });
    },
  },
  {
    middlewares: [parseIntPipe('id')],
    path: '/posts/:id',
    method: 'get',
    handler: async (req, res) => {
      const { id } = req.params;

      const data = await postService.findOne({
        where: {
          id: +id,
        },
        relations: ['tags', 'author'],
      });

      res.json({ data });
    },
  },
  {
    middlewares: [
      authenticate,
      reqValidator(addTagsSchema),
      parseIntPipe('id'),
    ],
    path: '/posts/:id/tag',
    method: 'post',
    handler: async (req, res) => {
      const postId = req.params.id;
      const { id } = req.user as Partial<User>;

      const data = await postService.addTags(id!, +postId, req.body.tags);

      res.json({ data });
    },
  },
] as Router[];
