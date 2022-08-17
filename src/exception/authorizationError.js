/* eslint-disable require-jsdoc */
import ClientError from './clientError';

class AuthorizationError extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export default AuthorizationError;