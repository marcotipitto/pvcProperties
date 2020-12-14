const Rental = require('../models/rental')

exports.getRentals = (req, res) => {
    Rental.find({}, (error, data) => {
        if (error) {
            return res.mongoError(error);
        }
        return res.json(data);
    })
}

exports.getRentalById = (req, res) => {
    const { id } = req.params;
    Rental.findById(id, (error, data) => {
        if (error) {
            return res.mongoError(error);
        }
        return res.json(data)
    })
}

exports.createRental = (req, res) => {
    const rentalData = req.body;
    Rental.create(rentalData, (error, data) => {
        if (error) {
            return res.mongoError(error);
        } 
        return res.json({message: `Rental with id: ${data._id} was added.`})
    })
}

// exports.updateRental = (req, res) => {
//     const { id } = req.params;
//     const rentalToUpdate = req.body;
//     const rentalIndex = rentals.findIndex(r=> r._id === id);

//     rentals[rentalIndex].city = rentalToUpdate.city;
//     rentals[rentalIndex].title = rentalToUpdate.title

//     return res.json({message: `Rental with id: ${id} was modified.`})
// }

// exports.deleteRental = (req, res) => {
//     const { id } = req.params;

//     const rentalIndex = rentals.findIndex(r=> r._id === id);
//     rentals.splice(rentalIndex, 1);

//     return res.json({message: `Rental with id: ${id} was removed.`})
// }