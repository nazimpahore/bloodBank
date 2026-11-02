import express from 'express';
import BloodInfo from '../models/BloodInfo.js';
import BloodDInfo from '../models/BloodDInfo.js';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';

const router = express.Router();

// Public blood stock search
router.get('/blood-stock', async (req, res) => {
  try {
    const { bg, search } = req.query;
    const filterGroup = bg || search;
    const query = filterGroup ? { bg: filterGroup } : {};

    const stock = await BloodInfo.find(query)
      .populate('hospital', 'hname hemail hphone hcity')
      .sort({ createdAt: -1 });

    const formatted = stock.map(item => ({
      bid: item._id,
      _id: item._id,
      hid: item.hospital?._id,
      hname: item.hospital?.hname || 'Partner Hospital',
      hemail: item.hospital?.hemail || '',
      hphone: item.hospital?.hphone || '',
      hcity: item.hospital?.hcity || 'Unknown',
      bg: item.bg,
      createdAt: item.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public voluntary community donors directory
router.get('/community-donors', async (req, res) => {
  try {
    const { bg, search } = req.query;
    const filterGroup = bg || search;
    const query = filterGroup ? { bg: filterGroup } : {};

    const donors = await BloodDInfo.find(query)
      .populate('receiver', 'rname remail rphone rcity rbg')
      .sort({ createdAt: -1 });

    const formatted = donors.map(item => ({
      bdid: item._id,
      _id: item._id,
      rid: item.receiver?._id,
      rname: item.receiver?.rname || 'Community Donor',
      remail: item.receiver?.remail || '',
      rphone: item.receiver?.rphone || '',
      rcity: item.receiver?.rcity || 'Unknown',
      bg: item.bg,
      createdAt: item.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public metrics stats
router.get('/stats', async (req, res) => {
  try {
    const donorCount = await Receiver.countDocuments();
    const hospitalCount = await Hospital.countDocuments();
    const stockCount = await BloodInfo.countDocuments();

    res.json({
      donors: donorCount,
      hospitals: hospitalCount,
      stockUnits: stockCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

