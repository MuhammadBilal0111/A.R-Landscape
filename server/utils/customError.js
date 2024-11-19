class CustomErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true; // because it is used for operational errors
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = CustomErrors;
