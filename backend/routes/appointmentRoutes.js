const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { getDbStatus } = require('../config/db');
const memoryStore = require('../services/storage');
const { protect } = require('../middleware/auth');

// GET /api/appointments (Admin protected)
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;

    if (getDbStatus()) {
      const query = {};
      if (status && status !== 'All') query.status = status;
      const appointments = await Appointment.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: appointments.length, data: appointments });
    } else {
      const appointments = memoryStore.getAppointments(status);
      return res.json({ success: true, count: appointments.length, data: appointments });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/appointments/:id (Check booking status by ref code or ID)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      let apt = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        apt = await Appointment.findById(id);
      }
      if (!apt) {
        apt = await Appointment.findOne({ referenceCode: id.toUpperCase() });
      }
      if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, data: apt });
    } else {
      const apt = memoryStore.getAppointmentById(id);
      if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, data: apt });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/appointments (Public client booking)
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, email, serviceType, date, timeSlot, address, notes } = req.body;

    if (!customerName || !phone || !email || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please fill in all required appointment fields' });
    }

    if (getDbStatus()) {
      const referenceCode = 'EY-' + Math.floor(100000 + Math.random() * 900000);
      const newApt = await Appointment.create({
        referenceCode,
        customerName,
        phone,
        email,
        serviceType: serviceType || 'In-Store Eye Test',
        date,
        timeSlot,
        address: address || '',
        notes: notes || '',
        status: 'Pending',
      });
      return res.status(201).json({ success: true, data: newApt });
    } else {
      const created = memoryStore.addAppointment({
        customerName,
        phone,
        email,
        serviceType: serviceType || 'In-Store Eye Test',
        date,
        timeSlot,
        address: address || '',
        notes: notes || '',
      });
      return res.status(201).json({ success: true, data: created });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/appointments/:id/status (Admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    if (getDbStatus()) {
      let updated = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
      }
      if (!updated) {
        updated = await Appointment.findOneAndUpdate({ referenceCode: id }, { status }, { new: true });
      }
      if (!updated) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, data: updated });
    } else {
      const updated = memoryStore.updateAppointmentStatus(id, status);
      if (!updated) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, data: updated });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/appointments/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      let deleted = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        deleted = await Appointment.findByIdAndDelete(id);
      }
      if (!deleted) {
        deleted = await Appointment.findOneAndDelete({ referenceCode: id });
      }
      if (!deleted) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, message: 'Appointment removed' });
    } else {
      const ok = memoryStore.deleteAppointment(id);
      if (!ok) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, message: 'Appointment removed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
