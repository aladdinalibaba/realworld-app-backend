import Joi, { Schema } from 'joi';
import { Handler, ErrorRequestHandler } from 'express';
import HttpException from './util/exception';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    errors: {
      message: err.message || 'Something went wrong',
      details: err.details,
    },
  });
};

function reqValidator(
  schema: Schema,
  where: 'body' | 'query' | 'params' = 'body',
): Handler {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[where], {
      abortEarly: false,
    });

    if (error) {
      throw new HttpException(
        'Invalid input',
        400,
        error.details.map((e) => e.message),
      );
    }

    req[where] = value;

    next();
  };
}

function parseIntPipe(key: string, min: number = -1) {
  const schema = Joi.object({
    [key]: Joi.number().integer().greater(min).required(),
  }).unknown(true);

  return reqValidator(schema, 'params');
}

export { errorHandler, reqValidator, parseIntPipe };
