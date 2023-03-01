export default class InvalidParamError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'InvalidParamError';
    this.statusCode = 401;
  }
}
