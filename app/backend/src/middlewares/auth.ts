import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import JWT from '../utils/jwtUtils/JWT';

const validator = new JWT();

const validateToken = (request: Request, _response: Response, next: NextFunction) => {
  const token = request.headers.authorization;
  if (!token) {
    throw new JsonWebTokenError('Token must be a valid token');
  }
  const payload = validator.verify(token);
  request.body.user = payload;
  next();
};

export default validateToken;
