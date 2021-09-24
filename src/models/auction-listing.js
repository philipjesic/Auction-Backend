/**
 * Represents an Auction Listing
 */
class AuctionListing {
  /**
     * Instantiates an Auction Listing
     * @param {Object} obj - object that contains the fields.
     */
  constructor(obj) {
    this.listing_title = obj ? obj.listing_title : null;
    this.id = obj ? obj.id : null;
  }
};

module.exports = AuctionListing;
