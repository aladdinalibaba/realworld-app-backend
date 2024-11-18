function getPagination(query) {
  const limit = parseInt(query.limit, 10);
  const offset = parseInt(query.offset, 10);

  if (
    !Number.isInteger(limit) ||
    limit <= 0 ||
    !Number.isInteger(offset) ||
    offset < 0
  ) {
    return {};
  }

  return { take: limit, skip: offset };
}

export default getPagination;
