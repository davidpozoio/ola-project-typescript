import { ErrorData } from "../const/errors";

export default class HttpError extends Error {
  isOperational?: boolean = true;
  message: string;
  statusCode: number;
  errorCode: string;

  constructor(error: ErrorData) {
    super();
    this.message = error.message;
    this.statusCode = error.statusCode;
    this.errorCode = error.errorCode;
  }
}
