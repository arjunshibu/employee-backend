import { ErrorCodes } from '../util/errorCode';
import HttpException from './HttpException';

class NoAddressException extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.NO_ADDRESS;
    super(400, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default NoAddressException;
