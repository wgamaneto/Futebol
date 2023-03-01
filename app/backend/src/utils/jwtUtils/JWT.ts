import { JsonWebTokenError, JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';

interface IJWT {
  sign(payload: JwtPayload): string
  verify(token: string): JwtPayload
}

export default class JWT implements IJWT {
  private secret: Secret;
  private jwtConfig: SignOptions;

  constructor() {
    this.secret = process.env.JWT_SECRET || '';
    this.jwtConfig = {
      expiresIn: '10d',
      algorithm: 'HS256',
    };
  }

  sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  verify(token: string): JwtPayload {
    try {
      const payload = verify(token, this.secret);
      return payload as JwtPayload;
    } catch (error) {
      throw new JsonWebTokenError('Token must be a valid token');
    }
  }
}
