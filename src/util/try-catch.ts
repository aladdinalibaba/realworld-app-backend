import { Handler } from 'express';

function tryCatch(handler: Handler): Handler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default tryCatch;
