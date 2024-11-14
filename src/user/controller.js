import userModel from './model.js';

async function getAll(req, res) {
  const data = await userModel.findAll();

  res.json({ data });
}

async function create(req, res) {
  const data = await userModel.create(req.body.data);

  res.status(201).json({
    data,
  });
}

export default { create, getAll };
