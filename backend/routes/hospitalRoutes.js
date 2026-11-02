import express from 'express';
import BloodInfo from '../models/BloodInfo.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodDonate from '../models/BloodDonate.js';

const router = express.Router();

// Get Hospital's current blood stock
router.get('/stock/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    const stock = await BloodInfo.find({ hospital: hid }).sort({ createdAt: -1 });
    res.json(stock.map(item => ({
      bid: item._id,
      _id: item._id,
      hid: item.hospital,
      bg: item.bg,
      createdAt: item.createdAt,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add sample to stock
router.post('/stock', async (req, res) => {
  try {
    const { hid, bg } = req.body;
    if (!hid || !bg) {
      return res.status(400).json({ error: 'Hospital ID and Blood Group are required.' });
    }
    const exists = await BloodInfo.findOne({ hospital: hid, bg });
    if (exists) {
      return res.status(409).json({ error: `Blood group ${bg} is already present in your stock.` });
    }
    const created = await BloodInfo.create({ hospital: hid, bg });
    res.status(201).json({
      message: `Blood group ${bg} added to inventory!`,
      item: {
        bid: created._id,
        _id: created._id,
        hid: created.hospital,
        bg: created.bg,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove sample from stock
router.delete('/stock/:bid', async (req, res) => {
  try {
    const { bid } = req.params;
    await BloodInfo.findByIdAndDelete(bid);
    res.json({ message: 'Blood sample removed from stock.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Incoming Patient requests
router.get('/requests/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    const requests = await BloodRequest.find({ hospital: hid })
      .populate('receiver', 'rname remail rphone rcity rbg')
      .sort({ createdAt: -1 });

    const formatted = requests.map(r => ({
      reqid: r._id,
      _id: r._id,
      hid: r.hospital,
      rid: r.receiver?._id,
      rname: r.receiver?.rname || 'Patient',
      remail: r.receiver?.remail || '',
      rphone: r.receiver?.rphone || '',
      rcity: r.receiver?.rcity || '',
      bg: r.bg,
      status: r.status,
      createdAt: r.createdAt,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept patient request
router.put('/requests/:reqid/accept', async (req, res) => {
  try {
    const { reqid } = req.params;
    const updated = await BloodRequest.findByIdAndUpdate(reqid, { status: 'Accepted' }, { new: true });
    res.json({ message: 'Request accepted!', request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject patient request
router.put('/requests/:reqid/reject', async (req, res) => {
  try {
    const { reqid } = req.params;
    const updated = await BloodRequest.findByIdAndUpdate(reqid, { status: 'Rejected' }, { new: true });
    res.json({ message: 'Request declined.', request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get outbound requests sent to voluntary donors
router.get('/donor-requests/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    const requests = await BloodDonate.find({ hospital: hid })
      .populate('receiver', 'rname remail rphone rcity')
      .sort({ createdAt: -1 });

    const formatted = requests.map(r => ({
      donoid: r._id,
      _id: r._id,
      hid: r.hospital,
      rid: r.receiver?._id,
      rname: r.receiver?.rname || 'Donor',
      remail: r.receiver?.remail || '',
      rphone: r.receiver?.rphone || '',
      rcity: r.receiver?.rcity || '',
      bg: r.bg,
      status: r.status,
      createdAt: r.createdAt,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Request voluntary community donor
router.post('/donor-requests', async (req, res) => {
  try {
    const { hid, rid, bg } = req.body;
    if (!hid || !rid || !bg) {
      return res.status(400).json({ error: 'Hospital, Receiver, and Blood Group are required.' });
    }
    const duplicate = await BloodDonate.findOne({ hospital: hid, receiver: rid, bg, status: 'Pending' });
    if (duplicate) {
      return res.status(409).json({ error: 'You already have an active pending inquiry for this donor.' });
    }
    const created = await BloodDonate.create({ hospital: hid, receiver: rid, bg, status: 'Pending' });
    res.status(201).json({ message: 'Inquiry sent to voluntary community donor!', request: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel outbound donor request
router.delete('/donor-requests/:donoid', async (req, res) => {
  try {
    const { donoid } = req.params;
    await BloodDonate.findByIdAndDelete(donoid);
    res.json({ message: 'Donor inquiry cancelled.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

