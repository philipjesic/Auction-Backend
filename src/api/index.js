const auctionListing = require('./car-auction-listing-routes.js');

/**
 * Sets all the routers for the express app.
 * @param {Express} app - Express Application
 */
function mountRoutes(app) {
  app.use('/car-auction-listings', auctionListing);
}

module.exports.mountRoutes = mountRoutes;
