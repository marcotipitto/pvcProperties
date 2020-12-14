const express = require('express');
const router = express.Router();
const { 
    getRentals, 
    getRentalById, 
    createRental, 
    // updateRental, 
    // deleteRental 
} = require('../controllers/rentals');

router.get('', getRentals);

router.get('/:id', getRentalById);

router.post('', createRental);

// router.patch('/:id', updateRental);

// router.delete('/:id', deleteRental);

module.exports = router;