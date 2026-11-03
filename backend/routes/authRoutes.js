import express from 'express';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';
import PasswordReset from '../models/PasswordReset.js';

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

// ==========================================
// Forgot / Reset Password Endpoints
// ==========================================

// Request 6-digit OTP code for password reset
router.post('/forgot-password/request', async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email || !role) {
      return res.status(400).json({ error: 'Email and account role are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let accountName = '';
    let phone = '';

    if (role === 'hospital') {
      const hospital = await Hospital.findOne({ hemail: cleanEmail });
      if (!hospital) {
        return res.status(404).json({ error: 'No hospital found registered with this email address.' });
      }
      accountName = hospital.hname;
      phone = hospital.hphone;
    } else if (role === 'receiver') {
      const receiver = await Receiver.findOne({ remail: cleanEmail });
      if (!receiver) {
        return res.status(404).json({ error: 'No user account found registered with this email address.' });
      }
      accountName = receiver.rname;
      phone = receiver.rphone;
    } else {
      return res.status(400).json({ error: 'Invalid account role specified.' });
    }

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Valid for 15 minutes

    await PasswordReset.findOneAndUpdate(
      { email: cleanEmail, role },
      { otp, expiresAt },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`[LifeDrop Password Reset] OTP for ${cleanEmail} (${role}): ${otp}`);

    res.json({
      message: `A verification code has been generated for ${accountName}.`,
      email: cleanEmail,
      role,
      otp, // included for seamless verification / offline or demo testing
      phoneHint: phone ? `***-***-${phone.slice(-4)}` : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify 6-digit OTP code
router.post('/forgot-password/verify', async (req, res) => {
  try {
    const { email, role, otp } = req.body;
    if (!email || !role || !otp) {
      return res.status(400).json({ error: 'Email, account role, and verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    const record = await PasswordReset.findOne({
      email: cleanEmail,
      role,
      otp: cleanOtp,
    });

    if (!record) {
      return res.status(400).json({ error: 'Invalid verification code. Please check and try again.' });
    }

    if (new Date() > record.expiresAt) {
      await PasswordReset.deleteOne({ _id: record._id });
      return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }

    res.json({
      message: 'Verification code verified successfully. You may now enter your new password.',
      verified: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset Password with OTP Code
router.post('/forgot-password/reset', async (req, res) => {
  try {
    const { email, role, otp, newPassword, confirmPassword } = req.body;
    if (!email || !role || !otp || !newPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    const record = await PasswordReset.findOne({
      email: cleanEmail,
      role,
      otp: cleanOtp,
    });

    if (!record) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    if (new Date() > record.expiresAt) {
      await PasswordReset.deleteOne({ _id: record._id });
      return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }

    // Update password in database
    if (role === 'hospital') {
      const updated = await Hospital.findOneAndUpdate(
        { hemail: cleanEmail },
        { hpassword: newPassword },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Hospital not found.' });
    } else if (role === 'receiver') {
      const updated = await Receiver.findOneAndUpdate(
        { remail: cleanEmail },
        { rpassword: newPassword },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'User account not found.' });
    }

    // Delete used OTP
    await PasswordReset.deleteOne({ _id: record._id });

    res.json({
      message: 'Password has been reset successfully! You can now log in with your new password.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset Password with Registered Phone Verification (Fast fallback/alternate)
router.post('/forgot-password/reset-with-phone', async (req, res) => {
  try {
    const { email, phone, role, newPassword, confirmPassword } = req.body;
    if (!email || !phone || !role || !newPassword) {
      return res.status(400).json({ error: 'Email, registered phone number, role, and new password are required.' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/[-\s]/g, '');

    if (role === 'hospital') {
      const hospital = await Hospital.findOne({ hemail: cleanEmail });
      if (!hospital) {
        return res.status(404).json({ error: 'No hospital found registered with this email address.' });
      }
      const existingPhone = (hospital.hphone || '').trim().replace(/[-\s]/g, '');
      if (existingPhone !== cleanPhone) {
        return res.status(400).json({ error: 'Phone number does not match registered hospital records.' });
      }
      hospital.hpassword = newPassword;
      await hospital.save();
    } else if (role === 'receiver') {
      const receiver = await Receiver.findOne({ remail: cleanEmail });
      if (!receiver) {
        return res.status(404).json({ error: 'No user account found registered with this email address.' });
      }
      const existingPhone = (receiver.rphone || '').trim().replace(/[-\s]/g, '');
      if (existingPhone !== cleanPhone) {
        return res.status(400).json({ error: 'Phone number does not match registered user records.' });
      }
      receiver.rpassword = newPassword;
      await receiver.save();
    } else {
      return res.status(400).json({ error: 'Invalid account role specified.' });
    }

    res.json({
      message: 'Password has been reset successfully! You can now log in with your new password.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

