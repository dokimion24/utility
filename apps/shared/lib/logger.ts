import type { HTTPError } from 'ky';

export class UserException extends Error {
  cause?: string;
  constructor(message: string, option: { name: string; cause: string }) {
    super(message);
    this.name = option.name;
    this.message = message;
    this.cause = option.cause;
  }
}

export class HttpError {
  private static errorStatus(status: number) {
    switch (status) {
      case 401:
        throw new UserException('AuthError', {
          name: status.toString(),
          cause: 'Unauthorized',
        });
      case 403:
        throw new UserException('ForbiddenError', {
          name: status.toString(),
          cause: 'Forbidden',
        });
      case 404:
        throw new UserException('NotFoundError', {
          name: status.toString(),
          cause: 'Not Found',
        });
      case 500:
        throw new UserException('ServerError', {
          name: status.toString(),
          cause: 'Internal Server Error',
        });
      case 502:
        throw new UserException('NginxError', {
          name: status.toString(),
          cause: 'Bad Gateway',
        });
      case 503:
        throw new UserException('NginxError', {
          name: status.toString(),
          cause: 'Service Unavailable',
        });
      default:
        return;
    }
  }

  static async backend(error: HTTPError) {
    const { status } = error.response;
    return this.errorStatus(status);
  }

  static async gateway(error: HTTPError) {
    const { status } = error.response;
    if (status === 404) return;
    return this.errorStatus(status);
  }
}
