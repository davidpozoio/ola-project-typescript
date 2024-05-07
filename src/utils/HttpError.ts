export default class HttpError extends Error {
  operational = true;
  message: string;
  constructor(error: ErrorData) {
    super();
    this.message = error;
  }
}
