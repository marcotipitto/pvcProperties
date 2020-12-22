const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users')
const { 
    getRentals, 
    getUserRentals,
    getRentalById, 
    createRental, 
    verifyUser,
    updateRental, 
    deleteRental
} = require('../controllers/rentals');

router.get('', getRentals);

router.get('/:id', getRentalById);

router.get('/me', onlyAuthUser, getUserRentals)

router.post('', onlyAuthUser, createRental);

router.get('/:rentalId/verify-user', onlyAuthUser, verifyUser);

router.patch('/:rentalId', onlyAuthUser, updateRental);

router.delete('/:rentalId', onlyAuthUser, deleteRental);

module.exports = router;