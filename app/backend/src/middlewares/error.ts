import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: err.message });
  }
  console.log(err.stack);

  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
