const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
    bookingDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    duration: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPaid: { type: Boolean, default: false },
});

module.exports = mongoose.model('Booking', bookingSchema);