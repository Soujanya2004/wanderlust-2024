const Booking = require('../models/booking.js'); // Adjust the path as needed
const Listing = require("../models/listing.js");// Assuming you have a Listing model

const calculatePrice = (booking, pricePerDay) => {
    return booking.duration * booking.guests * pricePerDay; // Example calculation
};

module.exports.confirmBooking = async (req, res) => {
    try {
        // Extract booking details from the request body
        const { bookingDate, guests, duration } = req.body;
        const listingId = req.params.id; // From the URL
    
        // Create a new booking instance
        const booking = new Booking({
            listingId,
            bookingDate,
            guests,
            duration,
            userId: req.user._id, // Assuming req.user contains the logged-in user's details
            isPaid: false,
        });
    
        // Check if the listing is already booked
        const existingBooking = await Booking.findOne({ listingId, bookingDate });
        if (existingBooking) {
            return res.status(400).send("This listing is already booked for the selected date.");
        }

        // Save the booking to the database
        await booking.save();

        const pricePerDay = Listing.price; // Adjust if plane listings have a pricePerDay property
        const totalPrice = calculatePrice(booking, pricePerDay); // Define your price formula here

        res.render('payment.ejs', { booking, totalPrice }); 

    } catch (error) {
        console.error("Error confirming booking:", error);
        res.status(500).send("Server error, please try again.");
    }
};

module.exports.confirmPayment = async (req, res) => {
    const { cardNumber, expiryDate, cvv } = req.body; // You will handle payment processing here

    try {
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).send("Booking not found.");
        }

        // Simulate payment processing
        // Here, you would do the actual payment processing with a payment API
        // Assuming payment is successful:
        
        booking.isPaid = true;
        await booking.save();

        // Redirect to success page or show booking confirmation
        return res.json({ message: 'Payment successful! Thank you for your booking.' });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).send("Payment failed, please try again.");
    }
};