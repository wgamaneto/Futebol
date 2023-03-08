import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Payload } from '../../interfaces/payload';

dotenv.config();

function createToken(payload: Payload): string {
  return sign(payload, process.env.JWT_SECRET as string);
}

export function decodeToken(token: string) {
  return verify(token, process.env.JWT_SECRET as string);
}

export default createToken;
