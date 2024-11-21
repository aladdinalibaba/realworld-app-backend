import userService from './service.js';

async function getAll(req, res) {
  const data = await userService.findAll({
    include: {
      followers: true,
      following: true,
    },
  });

  res.json({ data });
}

async function getOne(req, res) {
  const data = await userService.findOne({
    where: {
      id: +req.params.userId,
    },
    include: {
      posts: true,
    },
  });

  res.json({ data });
}

async function create(req, res) {
  const data = await userService.create(req.body);

  res.status(201).json({ data });
}

async function follow(req, res) {
  const data = await userService.follow(+req.user, +req.params.userId);

  res.json({ data });
}

async function unFollow(req, res) {
  const data = await userService.unFollow(+req.user, +req.params.userId);

  res.json({ data });
}

export default { create, getAll, getOne, follow, unFollow };
