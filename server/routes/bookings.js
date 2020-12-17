const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users');
const { createBooking } = require('../controllers/bookings');
const { isUserRentalOwner } = require('../controllers/rentals');

router.post('', onlyAuthUser, isUserRentalOwner, createBooking);

module.exports = router;