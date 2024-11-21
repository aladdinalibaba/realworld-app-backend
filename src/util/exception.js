class HttpException extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.details = details;
  }
}

export default HttpException;
