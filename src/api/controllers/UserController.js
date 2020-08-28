import HttpStatus from 'http-status';

import { User } from '../models';

class UserController {
  async index(request, response) {
    try {
      const users = await User.find();
      
      return response.json(users);

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
  
  async store(request, response) {
    try {
      const { name, registry, photo, role } = request.body;

      let user = await User.findOne({ registry });
  
      if (!user) {               
        user = await User.create({
          name, 
          registry, 
          photo, 
          role
        });     
      }
    
      return response.json(user);

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    } 
  }
}

export default new UserController();