import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { JsonWebTokenError } from 'jsonwebtoken';
import MissingParamError from '../utils/errors/missing-param-error';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import UnauthorizedError from '../utils/errors/unauthorized-error';
import JWT from '../utils/jwtUtils/JWT';
import InvalidParamError from '../utils/errors/invalid-param-error';

export default class LoginServices {
  constructor(
    private userModel: ModelStatic<User> = User,
    private jwtService = new JWT(),
  ) {}

  static validatePassword(password: string, user: User | null): void {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }
  }

  static validateUserLoginData(email: string, password: string): void {
    if (!email || !password) {
      throw new MissingParamError('All fields must be filled');
    }
  }

  static validateEmailFormat(email: string): void {
    if (!email.includes('@')) {
      throw new InvalidParamError('Incorrect email or password');
    }
  }

  public async login({ email, password }: ILogin): Promise<string> {
    LoginServices.validateUserLoginData(email, password);
    LoginServices.validateEmailFormat(email);
    const user = await this.userModel.findOne({ where: { email } });
    LoginServices.validatePassword(password, user);
    const { id, role, username } = user as User;
    const token = this.jwtService.sign({ id, email, role, username });
    return token;
  }

  public validate(token: string): string {
    if (!token) {
      throw new JsonWebTokenError('Token must be a valid token');
    }
    const payload = this.jwtService.verify(token);
    const { role } = payload;
    return role;
  }
}
