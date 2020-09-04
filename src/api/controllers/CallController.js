import HttpStatus from 'http-status';

import { Call } from '../models';

import md5 from 'md5';

class CallController {
  async store(request, response) {
    try {

      const { registry } = request.params;

      const call = await Call.create({
        call: md5(registry)
      });       

      return response.status(HttpStatus.OK).json({ 'id': call.call });

    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json(e);
    } 
  }
}

export default new CallController();