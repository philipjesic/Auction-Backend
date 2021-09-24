// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {mountRoutes} = require('./api');
const httpLogger = require('./util/logging/http-logger');

/**
 * Represents the App.
 * Holds reference to the express server and it's middleware functions.
 */
class App {
  /**
     * Constructor for the App Object.
     */
  constructor() {
    this.server = express();
    this.configure();
    this.setRouters();
  }

  /**
   * Sets the api routes.
   */
  setRouters() {
    mountRoutes(this.server);
  }

  /**
   * Configures the App for API requests
   */
  configure() {
    this.server.use(bodyParser.json());
    this.server.use(httpLogger);
  }
}

module.exports = new App().server;
