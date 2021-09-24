/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const controller = require('../controllers/car-auction-listing-controller');

router.get('/', controller.getAuctionListings);
router.post('/', controller.postAuction);
router.put('/', controller.putAuction);
router.delete('/', controller.deleteAuction);

module.exports = router;
