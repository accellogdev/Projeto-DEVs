import HttpStatus from 'http-status';

import { Call } from '../models';

import md5 from 'md5';

class CallController {
  async store(request, response) {
    try {

      // Token

      const call = await Call.create({
        call: md5('')
      });       

      return response.status(HttpStatus.OK).json({ 'id': call.call });

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    } 
  }
}

export default new CallController();