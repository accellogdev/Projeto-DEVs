import HttpStatus from 'http-status';
import { User } from '../models';
import httpStatus from 'http-status';
import Jwt from '../auth/Jwt';

class LoginController {
  async auth(request, response) {
    const { registry } = request.body;
    console.log(registry);

    try {

      const user = await User.findOne({ 'registry': registry });

      if(!user) {
        return response.status(httpStatus.BAD_REQUEST).json({ 'error': 'Registry not exists.' });
      }

      const token = Jwt.generateAuthenticationToken({
        id: user._id,
        registry: user.registry,
      });

      return response.status(httpStatus.OK).json({
        '_id': user._id,
        'name': user.name,
        'registry': user.registry,
        // 'photo': user.photo,
        'role': user.role,
        'token': token,
        'createdAt': user.createdAt,
        'updatedAt': user.updatedAt
      });
      
    } catch (e) {
      return response.status(httpStatus.BAD_REQUEST).json(e);
    }
  }
}

export default new LoginController();