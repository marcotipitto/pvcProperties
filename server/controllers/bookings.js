const Booking = require('../models/booking');
const moment = require('moment')

exports.createBooking = async (req, res) => {
    const bookingData = req.body;
    const booking = new Booking({ ...bookingData, user:res.locals.user });

    if (!checkBookingDates(booking)) {
        return res.apiError({title: 'Invalid Booking', detail: 'Invalid Dates'});
    }

    try {
        const rentalBookings = await Booking.find({rental: booking.rental});
        if (checkBookingValidity(booking, rentalBookings)) {
            const savedBooking = await booking.save();
            return res.json({startDate: savedBooking.startDate, endDate: savedBooking.endDate});
        } else {
            return res.apiError({title: 'Invalid Booking', detail: 'Chosen Dates already taken'});
        };
    } catch(error) {
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