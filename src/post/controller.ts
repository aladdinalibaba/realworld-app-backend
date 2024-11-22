import { Router } from '../types';
import postService from './service';
import { authenticate } from '../auth/middleware';
import { reqValidator } from '../middleware';
import { addTagsSchema, createSchema } from './filter';
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
    path: '/posts/:id',
    method: 'get',
    handler: async (req, res) => {
      const data = await postService.findOne({
        relations: ['tags', 'author'],
      });

      res.json({ data });
    },
  },
  {
    middlewares: [authenticate, reqValidator(addTagsSchema)],
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
