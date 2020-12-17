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
    rentalData.owner = res.locals.users;

    Rental.create(rentalData, (error, data) => {
        if (error) {
            return res.mongoError(error);
        }
        return res.json(data)
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

// Middlewares

exports.isUserRentalOwner = (req, res, next) => {
    const { rental } = req.body;
    const user = res.locals.user;

    Rental
        .findById(rental)
        .populate('owner')
        .exec((error, foundRental) => {
            if (error) {
                return res.mongoError(error);
            };
            if (foundRental.owner === user.id) {
                return res.apiError({ title: 'Invalid User', detail: 'Owner cannot book own property' })
            }
            next();
        });
};