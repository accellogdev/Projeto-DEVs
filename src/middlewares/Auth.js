import JsonWebToken from 'jsonwebtoken';
import HttpStatus from 'http-status';

import { SECRET } from '../config/env';

class Auth {
  authenticate(request, response, next) {
    const { token } = request.headers;

    JsonWebToken.verify(token, SECRET, (error, claims) => {
      if (error) {
        return response
          .status(HttpStatus.UNAUTHORIZED).json(error);
      }

      const { sub } = claims;

      request.registry = sub;
      return next();
    });
  }
}

export default new Auth();
