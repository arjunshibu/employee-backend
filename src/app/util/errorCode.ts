/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
  UNAUTHORIZED: {
    CODE: 'UNAUTHORIZED',
    MESSAGE: 'User is not allowed to perform this operation',
  },
  USER_NOT_FOUND: {
    CODE: 'USER_NOT_FOUND',
    MESSAGE: 'User not found',
  },
  USER_WITH_ID_NOT_FOUND: {
    CODE: 'USER_WITH_ID_NOT_FOUND',
    MESSAGE: 'User with given id not found',
  },
  DEPARTMENT_WITH_ID_NOT_FOUND: {
    CODE: 'DEPARTMENT_WITH_ID_NOT_FOUND',
    MESSAGE: 'Department with given id not found',
  },
  VALIDATION_ERROR: {
    CODE: 'VALIDATION_ERROR',
    MESSAGE: 'Validation failed error',
  },
  NO_ADDRESS: {
    CODE: 'NO_ADDRESS',
    MESSAGE: 'User with given id does not have an addess',
  },
  ADDRESS_ALREADY_EXISTS: {
    CODE: 'ADDRESS_ALREADY_EXISTS',
    MESSAGE:
      'User with given id already has an address, you can only update or delete it',
  },
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
  CODE: string;
  MESSAGE: string;
}
