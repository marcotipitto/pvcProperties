const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: { type: String, required: true, maxlength: [128, 'Invalid length, Maximum is 128 characters']},
    city: { type: String, required: true, lowercase: true},
    address: { type: String, required: true, lowercase: true, minlength: [4, 'Invalid length, Minimum is 4 characters']},
    zip: { type: String, required: true, maxlength: [5, 'Zip must be 5 digits'], minlength: [5, 'Zip must be 5 digits']},
    category: { type: String, required: true, lowercase: true},
    image: [{ type: Schema.Types.ObjectId, ref: 'CloudinaryImage' }],
    description: { type: String, required: true},
    bedrooms: {type: Number, required: true, min: 0},
    bathrooms: {type: Number, required: true, min: 0},
    price: { type: Number, required: true, min: 0},
    parkingSpots: { type: Number, required: true, min: 0},
    security: { type: String},
    laundry: { type: String, required: true},
    leaseTerm: { type: String, required: true},
    pets: { type: Boolean, required: true},
    airCon: { type: Boolean},
    heating: { type: Boolean},
    floorNumber: { type: Number, required: true },
    elevator: { type: Boolean, required: true},
    dishwasher: { type: Boolean},
    refrigerator: { type: Boolean},
    smoking: { type: Boolean, required: true},
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now}
});


// available on instance
// rentalSchema.methods.returnError = function(res, config) {
//     const { status, detail } = config;
//     return res.status(status).send({errors: [{title: 'Rental Error', detail}]});
// }

rentalSchema.statics.sendError = function(res, config) {
    const { status, detail } = config;
    return res.status(status).send({errors: [{title: 'Rental Error', detail}]});
}

module.exports = mongoose.model('Rental', rentalSchema);