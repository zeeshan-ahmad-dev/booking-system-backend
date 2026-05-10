/**
 * Throws an HTTP error
 * @param {String} message
 * @param {Number} status
 */
export const throwErr = (message, status) => {
  const error = new Error(message);
  error.status = status || 500;

  throw error;
};
