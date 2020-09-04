import HttpStatus from 'http-status';

import { User } from '../models';

class UserController {
  async indexAll(request, response) {
    try {

      const users = await User.find();

      return response.send(users);

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  async indexOne(request, response) {
    try {
      const { registry } = request.params;

      const user = await User.findOne({ 'registry' : registry });

      return response.send(user);

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
  
  async store(request, response) {
    try {
      const { name, registry, role } = request.body;
      
      let user = await User.findOne({ registry });

      if (!user) {               
        user = await User.create({
          name, 
          registry, 
          role
        });     
      }

      return response.status(HttpStatus.CREATED).send(user);

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    } 
  }
}

export default new UserController();