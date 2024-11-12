import userModel from './model.js';

async function getAll(req, res) {
  const data = await userModel.findAll();

  res.json({ data });
}

export default { getAll };
