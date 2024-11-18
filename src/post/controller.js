import postModel from './model.js';
import getPagination from '../util/pagination.js';

async function create(req, res) {
  const data = await postModel.create(req.body.data, req.user);

  res.json({ data });
}

async function findAll(req, res) {
  const { query } = req;

  const page = getPagination(query);

  const data = await postModel.findAll({
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

  const data = await postModel.addTags(req.user, +postId, req.body.data);

  res.json({ data });
}

export default { create, findAll, addTags };
