import express from 'express';
import BloodDInfo from '../models/BloodDInfo.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodDonate from '../models/BloodDonate.js';

const router = express.Router();

// Get User's voluntary blood offerings
router.get('/donations/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    const donations = await BloodDInfo.find({ receiver: rid }).sort({ createdAt: -1 });
    res.json(donations.map(item => ({
      bdid: item._id,
      _id: item._id,
      rid: item.receiver,
      bg: item.bg,
      createdAt: item.createdAt,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Offer voluntary blood sample
router.post('/donations', async (req, res) => {
  try {
    const { rid, bg } = req.body;
    if (!rid || !bg) {
      return res.status(400).json({ error: 'Receiver ID and Blood Group are required.' });
    }
    const exists = await BloodDInfo.findOne({ receiver: rid, bg });
    if (exists) {
      return res.status(409).json({ error: `You have already registered sample ${bg}.` });
    }
    const created = await BloodDInfo.create({ receiver: rid, bg });
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
    res.status(500).json({ error: err.message });
  }
});

// Delete voluntary offering
router.delete('/donations/:bdid', async (req, res) => {
  try {
    const { bdid } = req.params;
    await BloodDInfo.findByIdAndDelete(bdid);
    res.json({ message: 'Sample listing removed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User's outbound requests to hospitals
router.get('/requests/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    const requests = await BloodRequest.find({ receiver: rid })
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
    res.status(500).json({ error: err.message });
  }
});

// Request blood from hospital
router.post('/requests', async (req, res) => {
  try {
    const { hid, rid, bg } = req.body;
    if (!hid || !rid || !bg) {
      return res.status(400).json({ error: 'Hospital, Receiver, and Blood Group are required.' });
    }
    const duplicate = await BloodRequest.findOne({ hospital: hid, receiver: rid, bg, status: 'Pending' });
    if (duplicate) {
      return res.status(409).json({ error: 'You already have an active pending request for this hospital and blood type.' });
    }
    const created = await BloodRequest.create({ hospital: hid, receiver: rid, bg, status: 'Pending' });
    res.status(201).json({ message: 'Blood request submitted successfully to hospital!', request: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel blood request
router.delete('/requests/:reqid', async (req, res) => {
  try {
    const { reqid } = req.params;
    await BloodRequest.findByIdAndDelete(reqid);
    res.json({ message: 'Blood request cancelled.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Hospital inquiries sent to this user
router.get('/inquiries/:rid', async (req, res) => {
  try {
    const { rid } = req.params;
    const inquiries = await BloodDonate.find({ receiver: rid })
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
    res.status(500).json({ error: err.message });
  }
});

// Accept hospital inquiry
router.put('/inquiries/:donoid/accept', async (req, res) => {
  try {
    const { donoid } = req.params;
    const updated = await BloodDonate.findByIdAndUpdate(donoid, { status: 'Accepted' }, { new: true });
    res.json({ message: 'You have agreed to donate blood for this request! Thank you.', request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Decline hospital inquiry
router.put('/inquiries/:donoid/reject', async (req, res) => {
  try {
    const { donoid } = req.params;
    const updated = await BloodDonate.findByIdAndUpdate(donoid, { status: 'Rejected' }, { new: true });
    res.json({ message: 'Donation inquiry declined.', request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

