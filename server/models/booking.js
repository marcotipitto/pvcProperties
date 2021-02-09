const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startDate: { type: Date, required: 'Start date is required' },
    endDate: { type: Date, required: 'End date is required' },
    price: { type: Number, required: 'Price is required' },
    nights: { type: Number, required: true },
    guests: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rental: { type: Schema.Types.ObjectId, ref: 'Rental', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);