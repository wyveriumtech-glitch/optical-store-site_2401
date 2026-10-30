const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    referenceCode: {
      type: String,
      unique: true,
      default: () => 'EY-' + Math.floor(100000 + Math.random() * 900000),
    },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    serviceType: {
      type: String,
      required: true,
      enum: [
        'In-Studio Eye Exam',
        'Contact Lens Clinic',
        'Myopia Management Consult',
        'Prescription Spectacles Fitting',
        'In-Store Eye Test',
        'Home Eye Test',
        'Prescription Check & Frame Fitting',
        'Contact Lens Consultation',
      ],
      default: 'In-Store Eye Test',
    },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    address: { type: String, default: '' },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
