const {Pool} = require('pg');
const logger = require('../util/logging');
const {DBError} = require('../util/backend-error');

// TODO: put database connectivity in another file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

/**
 * Runs a query on the next available client in the db client pool.
 * @param {string} queryText - the query that is run
 * @param {Array} params - Array of parameters
 * @return {Array} response
 */
async function query(queryText, params) {
  try {
    const res = await pool.query(queryText, params);
    return res;
  } catch (error) {
    const dbError = new DBError(error.message);
    logger.info(dbError.stack);
    throw dbError;
  }
}

module.exports = {
  query: query,
};
