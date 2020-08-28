import HttpStatus from 'http-status';
import From  from 'connect-form';

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
      const { nome, matricula, foto, cargo } = request.body;

      let user = await User.findOne({ matricula });
  
      if (!user) {
        user = await User.create({
          nome, 
          matricula, 
          foto, 
          cargo
        });
      }
    
      return response.json(user);

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    } 
  }
}

export default new UserController();