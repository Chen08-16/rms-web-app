const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  reservationid: { type: String, required: true },
  tablenumber: { type: Number, required: true },
  username: { type: String, required: true }, // Foreign key-like reference to User
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'complete'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
