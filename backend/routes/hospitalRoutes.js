import express from 'express';
import BloodInfo from '../models/BloodInfo.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodDonate from '../models/BloodDonate.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// All routes in hospitalRoutes require authenticated hospital role
router.use(verifyToken(['hospital']));

// Get Hospital's current blood stock
router.get('/stock/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    if (req.user.id !== hid) {
      return res.status(403).json({ error: 'Unauthorized to access another hospital’s stock.' });
    }

    const stock = await BloodInfo.find({ hospital: req.user.id }).sort({ createdAt: -1 });
    res.json(stock.map(item => ({
      bid: item._id,
      _id: item._id,
      hid: item.hospital,
      bg: item.bg,
      createdAt: item.createdAt,
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blood stock.' });
  }
});

// Add sample to stock (IDOR safe: always derives hospital from req.user.id)
router.post('/stock', async (req, res) => {
  try {
    const { bg } = req.body;
    if (!bg) {
      return res.status(400).json({ error: 'Blood Group is required.' });
    }
    if (!VALID_BLOOD_GROUPS.includes(bg)) {
      return res.status(400).json({ error: 'Invalid blood group.' });
    }

    const exists = await BloodInfo.findOne({ hospital: req.user.id, bg });
    if (exists) {
      return res.status(409).json({ error: `Blood group ${bg} is already present in your stock.` });
    }

    const created = await BloodInfo.create({ hospital: req.user.id, bg });
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
    res.status(500).json({ error: 'Failed to add blood sample.' });
  }
});

// Remove sample from stock (IDOR safe: verifies ownership)
router.delete('/stock/:bid', async (req, res) => {
  try {
    const { bid } = req.params;
    const sample = await BloodInfo.findById(bid);
    if (!sample) {
      return res.status(404).json({ error: 'Blood sample not found.' });
    }

    if (sample.hospital.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You cannot delete another hospital’s stock.' });
    }

    await BloodInfo.findByIdAndDelete(bid);
    res.json({ message: 'Blood sample removed from stock.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blood sample.' });
  }
});

// Get Incoming Patient requests
router.get('/requests/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    if (req.user.id !== hid) {
      return res.status(403).json({ error: 'Unauthorized to view another hospital’s requests.' });
    }

    const requests = await BloodRequest.find({ hospital: req.user.id })
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
    res.status(500).json({ error: 'Failed to retrieve patient requests.' });
  }
});

// Accept patient request (IDOR safe: verifies request belongs to this hospital)
router.put('/requests/:reqid/accept', async (req, res) => {
  try {
    const { reqid } = req.params;
    const request = await BloodRequest.findById(reqid);
    if (!request) {
      return res.status(404).json({ error: 'Blood request not found.' });
    }

    if (request.hospital.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to accept requests for another hospital.' });
    }

    request.status = 'Accepted';
    await request.save();

    res.json({ message: 'Request accepted!', request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept blood request.' });
  }
});

// Reject patient request (IDOR safe: verifies request belongs to this hospital)
router.put('/requests/:reqid/reject', async (req, res) => {
  try {
    const { reqid } = req.params;
    const request = await BloodRequest.findById(reqid);
    if (!request) {
      return res.status(404).json({ error: 'Blood request not found.' });
    }

    if (request.hospital.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to decline requests for another hospital.' });
    }

    request.status = 'Rejected';
    await request.save();

    res.json({ message: 'Request declined.', request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to decline blood request.' });
  }
});

// Get outbound requests sent to voluntary donors
router.get('/donor-requests/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    if (req.user.id !== hid) {
      return res.status(403).json({ error: 'Unauthorized to access another hospital’s inquiries.' });
    }

    const requests = await BloodDonate.find({ hospital: req.user.id })
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
    res.status(500).json({ error: 'Failed to retrieve donor inquiries.' });
  }
});

// Request voluntary community donor (IDOR safe: derives hospital from req.user.id)
router.post('/donor-requests', async (req, res) => {
  try {
    const { rid, bg } = req.body;
    if (!rid || !bg) {
      return res.status(400).json({ error: 'Donor (Receiver) ID and Blood Group are required.' });
    }
    if (!VALID_BLOOD_GROUPS.includes(bg)) {
      return res.status(400).json({ error: 'Invalid blood group.' });
    }

    const duplicate = await BloodDonate.findOne({
      hospital: req.user.id,
      receiver: rid,
      bg,
      status: 'Pending',
    });
    if (duplicate) {
      return res.status(409).json({ error: 'You already have an active pending inquiry for this donor.' });
    }

    const created = await BloodDonate.create({
      hospital: req.user.id,
      receiver: rid,
      bg,
      status: 'Pending',
    });
    res.status(201).json({ message: 'Inquiry sent to voluntary community donor!', request: created });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create donor inquiry.' });
  }
});

// Cancel outbound donor request (IDOR safe: verifies ownership)
router.delete('/donor-requests/:donoid', async (req, res) => {
  try {
    const { donoid } = req.params;
    const inquiry = await BloodDonate.findById(donoid);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry record not found.' });
    }

    if (inquiry.hospital.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You cannot cancel another hospital’s inquiry.' });
    }

    await BloodDonate.findByIdAndDelete(donoid);
    res.json({ message: 'Donor inquiry cancelled.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel donor inquiry.' });
  }
});

export default router;
