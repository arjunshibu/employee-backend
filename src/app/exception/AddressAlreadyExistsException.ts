import { ErrorCodes } from '../util/errorCode';
import HttpException from './HttpException';

class AddressAlreadyExistsException extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.ADDRESS_ALREADY_EXISTS;
    super(400, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default AddressAlreadyExistsException;
