import express from 'express';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';

const router = express.Router();

// Hospital Login
router.post('/hospital/login', async (req, res) => {
  try {
    const { hemail, hpassword } = req.body;
    if (!hemail || !hpassword) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }
    const hospital = await Hospital.findOne({ hemail: hemail.toLowerCase() });
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found with this email.' });
    }
    if (hospital.hpassword !== hpassword) {
      return res.status(401).json({ error: 'Invalid password credentials.' });
    }
    const userSession = {
      id: hospital._id,
      _id: hospital._id,
      hname: hospital.hname,
      hemail: hospital.hemail,
      hphone: hospital.hphone,
      hcity: hospital.hcity,
      role: 'hospital',
    };
    res.json({ message: 'Login successful', user: userSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hospital Register
router.post('/hospital/register', async (req, res) => {
  try {
    const { hname, hemail, hpassword, hphone, hcity } = req.body;
    if (!hname || !hemail || !hpassword || !hphone || !hcity) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const exists = await Hospital.findOne({ hemail: hemail.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Hospital email is already registered.' });
    }
    const hospital = await Hospital.create({
      hname,
      hemail: hemail.toLowerCase(),
      hpassword,
      hphone,
      hcity,
    });
    const userSession = {
      id: hospital._id,
      _id: hospital._id,
      hname: hospital.hname,
      hemail: hospital.hemail,
      hphone: hospital.hphone,
      hcity: hospital.hcity,
      role: 'hospital',
    };
    res.status(201).json({ message: 'Hospital registered successfully', user: userSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Receiver Login
router.post('/receiver/login', async (req, res) => {
  try {
    const { remail, rpassword } = req.body;
    if (!remail || !rpassword) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }
    const receiver = await Receiver.findOne({ remail: remail.toLowerCase() });
    if (!receiver) {
      return res.status(404).json({ error: 'User not found with this email.' });
    }
    if (receiver.rpassword !== rpassword) {
      return res.status(401).json({ error: 'Invalid password credentials.' });
    }
    const userSession = {
      id: receiver._id,
      _id: receiver._id,
      rname: receiver.rname,
      remail: receiver.remail,
      rphone: receiver.rphone,
      rbg: receiver.rbg,
      rcity: receiver.rcity,
      role: 'receiver',
    };
    res.json({ message: 'Login successful', user: userSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Receiver Register
router.post('/receiver/register', async (req, res) => {
  try {
    const { rname, remail, rpassword, rphone, rbg, rcity } = req.body;
    if (!rname || !remail || !rpassword || !rphone || !rbg || !rcity) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const exists = await Receiver.findOne({ remail: remail.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }
    const receiver = await Receiver.create({
      rname,
      remail: remail.toLowerCase(),
      rpassword,
      rphone,
      rbg,
      rcity,
    });
    const userSession = {
      id: receiver._id,
      _id: receiver._id,
      rname: receiver.rname,
      remail: receiver.remail,
      rphone: receiver.rphone,
      rbg: receiver.rbg,
      rcity: receiver.rcity,
      role: 'receiver',
    };
    res.status(201).json({ message: 'Account created successfully', user: userSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Hospital Profile
router.put('/hospital/profile', async (req, res) => {
  try {
    const { id, hname, hcity, hphone, hpassword } = req.body;
    if (!id) return res.status(400).json({ error: 'Hospital ID is required.' });

    const updateFields = { hname, hcity, hphone };
    if (hpassword) updateFields.hpassword = hpassword;

    const updated = await Hospital.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) return res.status(404).json({ error: 'Hospital not found' });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updated._id,
        _id: updated._id,
        hname: updated.hname,
        hemail: updated.hemail,
        hcity: updated.hcity,
        hphone: updated.hphone,
        role: 'hospital',
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Receiver Profile
router.put('/receiver/profile', async (req, res) => {
  try {
    const { id, rname, rbg, rcity, rphone, rpassword } = req.body;
    if (!id) return res.status(400).json({ error: 'Receiver ID is required.' });

    const updateFields = { rname, rbg, rcity, rphone };
    if (rpassword) updateFields.rpassword = rpassword;

    const updated = await Receiver.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updated._id,
        _id: updated._id,
        rname: updated.rname,
        remail: updated.remail,
        rbg: updated.rbg,
        rcity: updated.rcity,
        rphone: updated.rphone,
        role: 'receiver',
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

