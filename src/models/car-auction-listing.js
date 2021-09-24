const db = require('../db');
const AuctionListing = require('./auction-listing');
const {DBError} = require('../util/backend-error');

/**
 * Represents a Car Auction Listing
 */
class CarAuctionListing extends AuctionListing {
  /**
   * Instantiates an CarAuctionListing object
   * @param {Object} obj - Object that contains the fields.
   */
  constructor(obj) {
    super(obj);
    this.make = obj ? obj.make : null;
    this.model = obj ? obj.model : null;
    this.year = obj ? obj.year : null;
    this.mileage = obj ? obj.mileage : null;
    this.mileage_type = obj ? obj.mileage_type : null;
    this.title_status = obj ? obj.title_status : null;
    this.featured = obj ? obj.featured : null;
  }
}

module.exports.CarAuctionListing = CarAuctionListing;

/**
 * Retrieves a CarAuctionListing object.
 * @param {obj} queryParams - Object containing all the query params.
 * @return {Array} - All of the Car Listing Auctions.
 */
async function get(queryParams) {
  try {
    let paramCount = 0;
    const values = [];

    // Query
    let query = `SELECT * FROM car_auction_listing WHERE`;

    // Add Params
    if (queryParams.id) {
      query = `${query} id=$${++paramCount} AND`;
      values.push(queryParams.id);
    }

    // Get rid of last `AND` if params were used, or 'WHERE'.
    paramCount > 0 ?
      (query = query.slice(0, -4)) :
      (query = query.slice(0, -6));

    const response = await db.query(query, values);
    return response.rows;
  } catch (error) {
    if (error instanceof DBError) {
      return error;
    } else {
      throw error;
    }
  }
}

module.exports.get = get;

/**
 * Inserts the CarAuctionListing Object into the database.
 * @param {CarAuctionListing} auctionListing - the object to insert.
 */
async function insert(auctionListing) {
  try {
    const insert = [];
    const values = [];
    const objectValues = [];

    Object.keys(auctionListing).forEach((key, i) => {
      insert.push(` ${key}`);
      values.push(`$${i + 1}`);
      objectValues.push(auctionListing[key]);
    });

    const query = `INSERT INTO car_auction_listing(${insert.join(
        ',',
    )}) VALUES (${values.join(',')})`;

    /*
    Object.keys(cols).forEach((key, i) => {
      query.push(i == 0 ? `${key}` : `, ${key}`);
      values.push(auctionListing[key]);
      valuesArray.push(i == 0 ? `$${i+1}` : `, $${i+1}`);
    });
    */

    // const query = `INSERT INTO car_auction_listing(id, listing_title, make,
    //  year, mileage, mileage_type, title_status, model)
    //  VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

    const res = await db.query(query, objectValues);

    return res;
  } catch (error) {
    if (error instanceof DBError) {
      return error;
    } else {
      throw error;
    }
  }
}

module.exports.insert = insert;

/**
 * Updates the CarAuctionListing object in the database.
 * @param {CarAuctionListing} auctionListing - the object to update.
 */
async function update(auctionListing) {
  try {
    const queryArray = [`UPDATE car_auction_listing set`];

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    const set = [];
    const values = [];
    Object.keys(cols).forEach((key, i) => {
      set.push(`${key} = ($${i + 1})`);
      values.push(auctionListing[key]);
    });
    queryArray.push(set.join(', '));

    // Add the WHERE statement to look up by id
    queryArray.push('WHERE id = ' + auctionListing.id);

    // Return a complete query string
    const query = queryArray.join(' ');

    const res = await db.query(query, values);

    return res;
  } catch (error) {
    if (error instanceof DBError) {
      return error;
    } else {
      throw error;
    }
  }
}

module.exports.update = update;

/**
 * Delete the CarAuctionListing object in the database.
 * @param {*} id - id of the object to delete.
 */
async function drop(id) {
  try {
    const query = `DELETE from car_auction_listing where id =  
    VALUES($1)`;

    const values = [id];

    await db.query(query, values);
  } catch (error) {
    if (error instanceof DBError) {
      return error;
    } else {
      throw error;
    }
  }
}

module.exports.drop = drop;
