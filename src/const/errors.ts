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
  USER_NOT_VERIFIED: {
    errorCode: "1005",
    statusCode: 404,
    message: "the user is not verified, please send the form to verify",
  },
  USER_NEEDS_DOCUMENTS: {
    errorCode: "1006",
    statusCode: 404,
    message: "the user needs to provide card photo and testification video",
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
  FORM_NOT_FOUND: {
    errorCode: "2004",
    statusCode: 404,
    message: "the form was not found",
  },
  RESULTS_NOT_ENOUGH: {
    errorCode: "2005",
    statusCode: 400,
    message: "you need to fill more fields",
  },
  RESULTS_ARE_VOID: {
    errorCode: "2006",
    statusCode: 400,
    message: "there are still void results, please fill it",
  },
  HASH_IS_NOT_VALID: {
    errorCode: "3001",
    statusCode: 400,
    message: "the provided hash is not valid",
  },
  HASH_NOT_PROVIDED: {
    errorCode: "3002",
    statusCode: 400,
    message: "you need a hash",
  },
  HASH_IS_EXPIRED: {
    errorCode: "3003",
    statusCode: 400,
    message: "the provided hash is expired, please use other",
  },

  FORM_SCHEME_NOT_FOUND: {
    errorCode: "4000",
    statusCode: 404,
    message: "the form scheme was not found",
  },
  FIELD_NOT_FOUND: {
    errorCode: "5000",
    statusCode: 404,
    message: "the field was not found",
  },
  FORM_GROUP_NOT_FOUND: {
    errorCode: "6000",
    statusCode: 404,
    message: "form_group was not found",
  },
  FIELD_NOT_BELONG_TO_THE_PROVIDED_FORM: {
    errorCode: "7000",
    statusCode: 400,
    message:
      "the provided field doesn't belong to the provided form, please check if the form_scheme contains the provided field",
  },
  FILE_FORMAT_NOT_ALLOWED: {
    errorCode: "8000",
    statusCode: 400,
    message: "the format of the provided file is not allowed",
  },
  FILE_NOT_FOUND: {
    errorCode: "8001",
    statusCode: 404,
    message: "the file was not found",
  },
  USER_FORM_NOT_DONE: {
    errorCode: "9000",
    statusCode: 400,
    message: "you must complete the user form to get the verification",
  },
};

export default ERRORS;
