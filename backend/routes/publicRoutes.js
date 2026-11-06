import express from 'express';
import BloodInfo from '../models/BloodInfo.js';
import BloodDInfo from '../models/BloodDInfo.js';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';

const router = express.Router();

const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const maskEmail = (email) => {
  if (!email || !email.includes('@')) return '';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user.slice(0, 2)}***${user.slice(-1)}@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return '';
  const clean = phone.replace(/\s+/g, '');
  if (clean.length < 4) return '***';
  return `${clean.slice(0, 4)}****${clean.slice(-3)}`;
};

// Public blood stock search
router.get('/blood-stock', async (req, res) => {
  try {
    const rawBg = typeof req.query.bg === 'string'
      ? req.query.bg.trim()
      : (typeof req.query.search === 'string' ? req.query.search.trim() : '');

    const query = rawBg && VALID_BLOOD_GROUPS.includes(rawBg) ? { bg: rawBg } : {};

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
    res.status(500).json({ error: 'Failed to search blood inventory.' });
  }
});

// Public voluntary community donors directory (with PII masking)
router.get('/community-donors', async (req, res) => {
  try {
    const rawBg = typeof req.query.bg === 'string'
      ? req.query.bg.trim()
      : (typeof req.query.search === 'string' ? req.query.search.trim() : '');

    const query = rawBg && VALID_BLOOD_GROUPS.includes(rawBg) ? { bg: rawBg } : {};

    const donors = await BloodDInfo.find(query)
      .populate('receiver', 'rname remail rphone rcity rbg')
      .sort({ createdAt: -1 });

    const formatted = donors.map(item => ({
      bdid: item._id,
      _id: item._id,
      rid: item.receiver?._id,
      rname: item.receiver?.rname || 'Community Donor',
      remail: maskEmail(item.receiver?.remail || ''),
      rphone: maskPhone(item.receiver?.rphone || ''),
      rcity: item.receiver?.rcity || 'Unknown',
      bg: item.bg,
      createdAt: item.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve donors directory.' });
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
    res.status(500).json({ error: 'Failed to retrieve system statistics.' });
  }
});

export default router;
