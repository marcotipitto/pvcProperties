const Booking = require('../models/booking');
const Rental = require('../models/rental');
const moment = require('moment');

exports.getBookings = async (req, res) => {
    const { rental } = req.query;
    const query = rental ? Booking.find({ rental }) : Booking.find({});

    try {
        const bookings = await query.select('startAt endAt -_id').exec();
        return res.json(bookings);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.getReceivedBookings = async (req, res) => {
    const { user } = res.locals;

    try {
        const rentals = await Rental.find({ owner: user }, '_id');
        const rentalIds = rentals.map(r => r.id);
        const bookings = await Booking
            .find({ rental: { $in: rentalIds } })
            .populate('user', '-password')
            .populate('rental');
        return res.json(bookings);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.getUserBookings = async (req, res) => {
    const { user } = res.locals;
    try {
        const bookings = await Booking
            .find({ user })
            .populate('user', '-password')
            .populate('rental');
        return res.json(bookings);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.deleteBooking = async (req, res) => {
    const DAYS_THRESHOLD = 3;
    const { bookingId } = req.params;
    const { user } = res.locals;

    try {
        const booking = await Booking.findById(bookingId).populate('user');

        if (user.id !== booking.user.id) {
            return res.sendApiError(
                {
                    title: 'Invalid User',
                    detail: 'You are not owner of this booking!'
                });
        }

        if (moment(booking.startAt).diff(moment(), 'days') > DAYS_THRESHOLD) {
            await booking.remove();
            return res.json({ id: bookingId });
        } else {
            return res.sendApiError(
                {
                    title: 'Invalid Booking',
                    detail: 'You cannot delete booking at least 3 days before arrival!'
                });
        }
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.createBooking = async (req, res) => {
    const bookingData = req.body;
    const booking = new Booking({ ...bookingData, user: res.locals.user });

    if (!checkBookingDates(booking)) {
        return res.apiError({ title: 'Invalid Booking', detail: 'Invalid Dates' });
    }

    try {
        const rentalBookings = await Booking.find({ rental: booking.rental });
        if (checkBookingValidity(booking, rentalBookings)) {
            const savedBooking = await booking.save();
            return res.json({ startDate: savedBooking.startDate, endDate: savedBooking.endDate });
        } else {
            return res.apiError({ title: 'Invalid Booking', detail: 'Chosen Dates already taken' });
        };
    } catch (error) {
        return res.mongoError(error)
    }
};

function checkBookingDates(booking) {
    let isValid = true;
    if (!booking.startDate || !booking.endDate) {
        isValid = false;
    }
    if (moment(booking.startDate) > moment(booking.endDate)) {
        isValid = false;
    }

    return isValid;
};

function checkBookingValidity(pendingBooking, rentalBookings) {
    let isValid = true;
    if (rentalBookings && rentalBookings.length > 0) {
        isValid = rentalBookings.every(booking => {
            const pendingStart = moment(pendingBooking.startDate);
            const pendingEnd = moment(pendingBooking.endDate);
            const bookingStart = moment(booking.startDate);
            const bookingEnd = moment(booking.endDate);

            return (
                (bookingStart < pendingStart && bookingEnd < pendingStart) ||
                (pendingEnd < bookingEnd && pendingEnd < bookingStart));
        });
    };
    return isValid;
};