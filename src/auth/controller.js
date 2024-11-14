function login(req, res) {
  res.json({
    data: req.user,
  });
}

export default { login };
