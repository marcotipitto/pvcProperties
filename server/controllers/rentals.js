const Rental = require('../models/rental');

exports.getRentals = async (req, res) => {
    const { city } = req.query;
    const query = city ? { city: city.toLowerCase() } : {}
    try {
        const rentals = await Rental.find(query).populate('image');
        return res.json(rentals);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.getUserRentals = async (req, res) => {
    const { user } = res.locals;
    try {
        const rentals = await Rental.find({ owner: user }).populate('image');;
        return res.json(rentals);
    } catch (error) {
        return res.mongoError(error);
    }
}


exports.getRentalById = async (req, res) => {
    const { id } = req.params;
    try {
        const rental = await Rental.findById(id).populate('owner image', '-password -_id');
        return res.json(rental);
    } catch (error) {
        return res.mongoError(error);
    }
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

exports.verifyUser = async (req, res) => {
    const { user } = res.locals;
    const { rentalId } = req.params;
    try {
        const rental = await Rental.findById(rentalId).populate('owner');
        if (rental.owner.id !== user.id) {
            return res.sendApiError(
                {
                    title: 'Invalid User',
                    detail: 'You are not owner of this rental!'
                });
        };
        return res.json({ status: 'verified' });
    } catch (error) {
        return res.mongoError(error);
    };
};

exports.updateRental = async (req, res) => {
    const { rentalId } = req.params;
    const { user } = res.locals;
    const rentalData = req.body;
    try {
        const rental = await Rental.findById(rentalId).populate('owner');
        if (rental.owner.id !== user.id) {
            return res.sendApiError(
                {
                    title: 'Invalid User',
                    detail: 'You are not owner of this rental!'
                });
        };
        rental.set(rentalData);
        await rental.save();
        const updatedRental = await Rental
            .findById(rentalId)
            .populate('owner image');
        return res.status(200).send(updatedRental);
    } catch (error) {
        return res.mongoError(error);
    };
};

exports.deleteRental = async (req, res) => {
    const { rentalId } = req.params;
    try {
        const rental = await Rental.findById(rentalId).populate('owner');
        await rental.remove();
        return res.json({ id: rentalId });
    } catch (error) {
        return res.mongoError(error);
    }
}

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