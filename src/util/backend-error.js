
/**
 * Customizable Error Object for the API.
 */
class APIError extends Error {
  /**
   * Custom Error Message
   * @param {string} message - error message
   */
  constructor(message) {
    super(message);
    this.name = 'API-Error';
  }
}

module.exports.APIError = APIError;

module.exports.APIErrorMessage =
`API Error - Could not perform the specified action.`;

/**
 * Customizable Error Object for the Database.
 */
class DBError extends Error {
  /**
     * Custom Error Message
     * @param {string} message - error message
     */
  constructor(message) {
    super(message);
    this.name = 'Database-Error';
  }
}

module.exports.DBError = DBError;

module.exports.DBErrorMessage =
`Internal Error - Could not perform the specified action`;


