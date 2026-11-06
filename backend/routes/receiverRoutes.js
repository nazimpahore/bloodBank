import express from 'express';
import BloodDInfo from '../models/BloodDInfo.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodDonate from '../models/BloodDonate.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// All routes in receiverRoutes require authenticated receiver/donor role
router.use(verifyToken(['receiver']));

// Get User's voluntary blood offerings
router.get('/donations/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    if (req.user.id !== rid) {
      return res.status(403).json({ error: 'Unauthorized to view another donor’s listings.' });
    }

    const donations = await BloodDInfo.find({ receiver: req.user.id }).sort({ createdAt: -1 });
    res.json(donations.map(item => ({
      bdid: item._id,
      _id: item._id,
      rid: item.receiver,
      bg: item.bg,
      createdAt: item.createdAt,
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve donation listings.' });
  }
});

// Offer voluntary blood sample (IDOR safe: always derives receiver from req.user.id)
router.post('/donations', async (req, res) => {
  try {
    const { bg } = req.body;
    if (!bg) {
      return res.status(400).json({ error: 'Blood Group is required.' });
    }
    if (!VALID_BLOOD_GROUPS.includes(bg)) {
      return res.status(400).json({ error: 'Invalid blood group.' });
    }

    const exists = await BloodDInfo.findOne({ receiver: req.user.id, bg });
    if (exists) {
      return res.status(409).json({ error: `You have already registered sample ${bg}.` });
    }

    const created = await BloodDInfo.create({ receiver: req.user.id, bg });
    res.status(201).json({
      message: `Your blood group ${bg} has been registered!`,
      item: {
        bdid: created._id,
        _id: created._id,
        rid: created.receiver,
        bg: created.bg,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register blood donation.' });
  }
});

// Delete voluntary offering (IDOR safe: verifies ownership)
router.delete('/donations/:bdid', async (req, res) => {
  try {
    const { bdid } = req.params;
    const sample = await BloodDInfo.findById(bdid);
    if (!sample) {
      return res.status(404).json({ error: 'Donation sample not found.' });
    }

    if (sample.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You cannot remove another donor’s sample.' });
    }

    await BloodDInfo.findByIdAndDelete(bdid);
    res.json({ message: 'Sample listing removed.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove sample listing.' });
  }
});

// Get User's outbound requests to hospitals
router.get('/requests/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    if (req.user.id !== rid) {
      return res.status(403).json({ error: 'Unauthorized to view another user’s blood requests.' });
    }

    const requests = await BloodRequest.find({ receiver: req.user.id })
      .populate('hospital', 'hname hemail hphone hcity')
      .sort({ createdAt: -1 });

    const formatted = requests.map(r => ({
      reqid: r._id,
      _id: r._id,
      rid: r.receiver,
      hid: r.hospital?._id,
      hname: r.hospital?.hname || 'Hospital',
      hemail: r.hospital?.hemail || '',
      hphone: r.hospital?.hphone || '',
      hcity: r.hospital?.hcity || '',
      bg: r.bg,
      status: r.status,
      createdAt: r.createdAt,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blood requests.' });
  }
});

// Request blood from hospital (IDOR safe: derives receiver from req.user.id)
router.post('/requests', async (req, res) => {
  try {
    const { hid, bg } = req.body;
    if (!hid || !bg) {
      return res.status(400).json({ error: 'Hospital and Blood Group are required.' });
    }
    if (!VALID_BLOOD_GROUPS.includes(bg)) {
      return res.status(400).json({ error: 'Invalid blood group.' });
    }

    const duplicate = await BloodRequest.findOne({
      hospital: hid,
      receiver: req.user.id,
      bg,
      status: 'Pending',
    });
    if (duplicate) {
      return res.status(409).json({ error: 'You already have an active pending request for this hospital and blood type.' });
    }

    const created = await BloodRequest.create({
      hospital: hid,
      receiver: req.user.id,
      bg,
      status: 'Pending',
    });
    res.status(201).json({ message: 'Blood request submitted successfully to hospital!', request: created });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit blood request.' });
  }
});

// Cancel blood request (IDOR safe: verifies ownership)
router.delete('/requests/:reqid', async (req, res) => {
  try {
    const { reqid } = req.params;
    const request = await BloodRequest.findById(reqid);
    if (!request) {
      return res.status(404).json({ error: 'Blood request not found.' });
    }

    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You cannot cancel another user’s request.' });
    }

    await BloodRequest.findByIdAndDelete(reqid);
    res.json({ message: 'Blood request cancelled.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel blood request.' });
  }
});

// Get Hospital inquiries sent to this user
router.get('/inquiries/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    if (req.user.id !== rid) {
      return res.status(403).json({ error: 'Unauthorized to view another user’s inquiries.' });
    }

    const inquiries = await BloodDonate.find({ receiver: req.user.id })
      .populate('hospital', 'hname hemail hphone hcity')
      .sort({ createdAt: -1 });

    const formatted = inquiries.map(r => ({
      donoid: r._id,
      _id: r._id,
      rid: r.receiver,
      hid: r.hospital?._id,
      hname: r.hospital?.hname || 'Hospital',
      hemail: r.hospital?.hemail || '',
      hphone: r.hospital?.hphone || '',
      hcity: r.hospital?.hcity || '',
      bg: r.bg,
      status: r.status,
      createdAt: r.createdAt,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve donation inquiries.' });
  }
});

// Accept hospital inquiry (IDOR safe: verifies inquiry belongs to this donor)
router.put('/inquiries/:donoid/accept', async (req, res) => {
  try {
    const { donoid } = req.params;
    const inquiry = await BloodDonate.findById(donoid);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    if (inquiry.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to respond to another user’s inquiry.' });
    }

    inquiry.status = 'Accepted';
    await inquiry.save();

    res.json({ message: 'You have agreed to donate blood for this request! Thank you.', request: inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept inquiry.' });
  }
});

// Decline hospital inquiry (IDOR safe: verifies inquiry belongs to this donor)
router.put('/inquiries/:donoid/reject', async (req, res) => {
  try {
    const { donoid } = req.params;
    const inquiry = await BloodDonate.findById(donoid);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    if (inquiry.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to respond to another user’s inquiry.' });
    }

    inquiry.status = 'Rejected';
    await inquiry.save();

    res.json({ message: 'Donation inquiry declined.', request: inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to decline inquiry.' });
  }
});

export default router;
