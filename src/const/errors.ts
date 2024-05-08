export type ErrorData = {
  errorCode: string;
  statusCode: number;
  message: string;
};

const ERRORS: { [key: string]: ErrorData } = {
  USER_EMAIL_NOT_FOUND: {
    errorCode: "1001",
    statusCode: 404,
    message: "email not found",
  },
  INCORRECT_PASSWORD: {
    errorCode: "1002",
    statusCode: 400,
    message: "the provided password is incorrect",
  },
  USER_NOT_FOUND: {
    errorCode: "1003",
    statusCode: 404,
    message: "user not found",
  },
  USER_DOES_NOT_HAVE_ACCESS: {
    errorCode: "1004",
    statusCode: 401,
    message: "you can't still login, you need admin permission",
  },
  EMAIL_ALREADY_EXISTS: {
    errorCode: "1004",
    statusCode: 400,
    message: "the provided email already exists",
  },
  JWT_NOT_PROVIDED: {
    errorCode: "2001",
    statusCode: 400,
    message: "please, login",
  },
  UNAUTHORIZED: {
    errorCode: "2002",
    statusCode: 401,
    message: "unauthorized access",
  },
  JWT_IS_EXPIRED: {
    errorCode: "2003",
    statusCode: 400,
    message: "the provided jwt is expired, login again",
  },
};

export default ERRORS;
