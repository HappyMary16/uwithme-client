import { DEV_MODE } from "../config";

export const getMessage = error => {
  if (error instanceof String) {
    return error;
  }

  if (!!error && !!error.message) {
    return error.message;
  }

  if (!!error && !!error.error) {
    return error.error;
  }

  if (!!error && !!error.data) {
    if (!!error.data.message && !DEV_MODE) {
      return error.data.message;
    } else {
      return (
        "message: " +
        error.data.message +
        " error: " +
        error.data.error +
        " status: " +
        error.data.status +
        " path: " +
        error.data.path
      );
    }
  }

  if (!!error && error.status) {
    return "Error status: " + error.status;
  }

  return "Unknown Error";
};
