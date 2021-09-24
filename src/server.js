const http = require('http');
const app = require('./app');
const logger = require('./util/logging');

const server = http.createServer(app);
server.listen(process.env.PORT);
logger.info(`Server started - listening on port ${process.env.PORT}`);

module.exports = server;
