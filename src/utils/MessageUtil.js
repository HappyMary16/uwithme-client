export const getMessage = error => {
  if (error instanceof String) {
    return error;
  }

  if (error.message) {
    return error.message
  }

  if (error.error) {
    return error.error
  }

  if (error.data) {
    return "message: " + error.data.message
      + " error: " + error.data.error
      + " status: " + error.data.status
      + " path: " + error.data.path;
  }

  if (error.status) {
    return "Error status: " + error.status
  }

  console.log(error)
  return "Unknown Error"
}