const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users')
const { 
    getRentals, 
    getRentalById, 
    createRental, 
    // updateRental, 
    // deleteRental 
} = require('../controllers/rentals');

router.get('', getRentals);

router.get('/:id', getRentalById);

router.post('', onlyAuthUser, createRental);

// router.patch('/:id', updateRental);

// router.delete('/:id', deleteRental);

module.exports = router;