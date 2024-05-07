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
};

export default ERRORS;
