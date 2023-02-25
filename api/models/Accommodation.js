const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    city:String,
    type: String,
    address: String,
    photos: [String],
    description: String,
    features: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
});

const AccommodationModel = mongoose.model('Accommodation', accommodationSchema);

module.exports = AccommodationModel;