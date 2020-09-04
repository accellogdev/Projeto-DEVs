import JsonWebToken from 'jsonwebtoken';

import { SECRET } from '../../config/env';

class Jwt {
  generateAuthenticationToken(userAuth) {
    const subject = `${userAuth.registry}`;
    const payload = {
      id: userAuth.id,
      data: 'foobar',
    };

    return JsonWebToken.sign(payload, SECRET, {
      algorithm: 'HS512',
      subject,
      expiresIn: '1h',
    });
  }
}

export default new Jwt();
