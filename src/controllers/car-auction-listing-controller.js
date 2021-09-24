/* eslint-disable max-len */
const model = require('../models/car-auction-listing');
const {randomInt} = require('crypto');
const {
  DBError,
  APIError,
  DBErrorMessage,
  APIErrorMessage,
} = require('../util/backend-error');
const logger = require('../util/logging');

const CAR_LISTING_ID_MAX = 1000000;

/**
 * Controller function to get car auction listing by id.
 * @param {*} req request object
 * @param {*} res response object
 */
async function getAuctionListings(req, res) {
  try {
    const auctionListings = await model.get(req.query);
    if (auctionListings instanceof DBError) {
      return res.status(500).json({message: DBErrorMessage});
    }
    return res.status(200).json(auctionListings);
  } catch (error) {
    logger.info(new APIError(error));
    return res.status(500).json({message: APIErrorMessage});
  }
}

exports.getAuctionListings = getAuctionListings;

/**
 * Controller function to post auction listing.
 * @param {*} req request object
 * @param {*} res response object
 */
async function postAuction(req, res) {
  try {
    const id = randomInt(CAR_LISTING_ID_MAX);
    const newListing = new model.CarAuctionListing(req.body);
    newListing.id = id;

    const dbRes = await model.insert(newListing);

    if (dbRes instanceof DBError) {
      return res.status(500).json({message: DBErrorMessage});
    }

    return res.status(201).json({
      message: `Car Auction listing '${newListing.listing_title}' has been sucessfully inserted with id ${id}.`,
      id: id,
    });
  } catch (error) {
    logger.info(new APIError(error.message));
    return res.status(500).json({message: APIErrorMessage});
  }
}

exports.postAuction = postAuction;

/**
 * Controller Function for PUT action on a car auction listing object
 * @param {*} req request object
 * @param {*} res response object
 */
async function putAuction(req, res) {
  try {
    const auctionListings = await model.get({id: req.body.id});
    if (auctionListings.length !== 1) {
      return res.status(404).json({
        message: `Car Auction Listing with id ${req.body.id} could not be found`,
      });
    }
    const listingObject = new model.CarAuctionListing(auctionListings[0]);
    const objFields = Object.keys(listingObject);
    const reqFields = Object.keys(req.body);

    reqFields.forEach((key, index) => {
      if (objFields.includes(key)) {
        if (key !== 'id') {
          listingObject[key] = req.body[key];
        }
      } else {
        return res.status(400).json({
          message: `The request contained an invalid parameter in the body: '${key}'.`,
        });
      }
    });

    const dbRes = await model.update(listingObject);

    if (dbRes instanceof DBError) {
      return res.status(500).json({message: DBErrorMessage});
    }

    return res.status(200).json({
      message: `Car Auction Listing with id ${listingObject.id} has been updated.`,
    });
  } catch (error) {
    logger.info(new APIError(error.message));
    return res.status(500).json({message: APIErrorMessage});
  }
}

exports.putAuction = putAuction;

/**
 * Controller function to peform DELETE action of a car auction object.
 * @param {*} req request object
 * @param {*} res response object
 */
async function deleteAuction(req, res) {
  try {
  } catch (error) {}
}

exports.deleteAuction = deleteAuction;
