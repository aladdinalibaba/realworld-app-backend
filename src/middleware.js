import HttpException from './util/exception.js';

function reqValidator(schema, where = 'body') {
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

export { reqValidator };
