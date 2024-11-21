import postService from './service.js';
import getPagination from '../util/pagination.js';

async function create(req, res) {
  const data = await postService.create(req.body, req.user);

  res.json({ data });
}

async function findAll(req, res) {
  const { query } = req;

  const page = getPagination(query);

  const data = await postService.findAll({
    include: {
      author: true,
    },
    where: {
      author: { username: query.author },
    },
    ...page,
  });

  res.json({ data });
}

async function addTags(req, res) {
  const { postId } = req.params;

  const data = await postService.addTags(req.user, +postId, req.body);

  res.json({ data });
}

export default { create, findAll, addTags };
