import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';
import PasswordReset from '../models/PasswordReset.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authLimiter, otpLimiter } from '../middleware/rateLimitMiddleware.js';
import {
  validateRequest,
  hospitalRegisterSchema,
  receiverRegisterSchema,
  hospitalLoginSchema,
  receiverLoginSchema,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

const generateToken = (user, role) => {
  return jwt.sign(
    {
      id: user._id,
      role,
      email: role === 'hospital' ? user.hemail : user.remail,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ==========================================
// Hospital Authentication
// ==========================================

// Hospital Login
router.post('/hospital/login', authLimiter, validateRequest(hospitalLoginSchema), async (req, res) => {
  try {
    const { hemail, hpassword } = req.body;

    const hospital = await Hospital.findOne({ hemail: hemail.toLowerCase() }).select('+hpassword');
    if (!hospital) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const isMatch = await hospital.comparePassword(hpassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const token = generateToken(hospital, 'hospital');
    const userSession = {
      id: hospital._id,
      _id: hospital._id,
      hname: hospital.hname,
      hemail: hospital.hemail,
      hphone: hospital.hphone,
      hcity: hospital.hcity,
      role: 'hospital',
    };

    res.json({
      message: 'Login successful',
      token,
      user: userSession,
    });
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed. Please try again.' });
  }
});

// Hospital Register
router.post('/hospital/register', authLimiter, validateRequest(hospitalRegisterSchema), async (req, res) => {
  try {
    const { hname, hemail, hpassword, hphone, hcity } = req.body;

    const exists = await Hospital.findOne({ hemail: hemail.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Hospital email is already registered.' });
    }

    const hospital = await Hospital.create({
      hname: hname.trim(),
      hemail: hemail.toLowerCase().trim(),
      hpassword,
      hphone: hphone.trim(),
      hcity: hcity.trim(),
    });

    const token = generateToken(hospital, 'hospital');
    const userSession = {
      id: hospital._id,
      _id: hospital._id,
      hname: hospital.hname,
      hemail: hospital.hemail,
      hphone: hospital.hphone,
      hcity: hospital.hcity,
      role: 'hospital',
    };

    res.status(201).json({
      message: 'Hospital registered successfully',
      token,
      user: userSession,
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed. Please check your data and try again.' });
  }
});

// ==========================================
// Receiver Authentication
// ==========================================

// Receiver Login
router.post('/receiver/login', authLimiter, validateRequest(receiverLoginSchema), async (req, res) => {
  try {
    const { remail, rpassword } = req.body;

    const receiver = await Receiver.findOne({ remail: remail.toLowerCase() }).select('+rpassword');
    if (!receiver) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const isMatch = await receiver.comparePassword(rpassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const token = generateToken(receiver, 'receiver');
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

    res.json({
      message: 'Login successful',
      token,
      user: userSession,
    });
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed. Please try again.' });
  }
});

// Receiver Register
router.post('/receiver/register', authLimiter, validateRequest(receiverRegisterSchema), async (req, res) => {
  try {
    const { rname, remail, rpassword, rphone, rbg, rcity } = req.body;

    const exists = await Receiver.findOne({ remail: remail.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    const receiver = await Receiver.create({
      rname: rname.trim(),
      remail: remail.toLowerCase().trim(),
      rpassword,
      rphone: rphone.trim(),
      rbg,
      rcity: rcity.trim(),
    });

    const token = generateToken(receiver, 'receiver');
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

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: userSession,
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed. Please check your data and try again.' });
  }
});

// ==========================================
// Session Verification Route (/me)
// ==========================================
router.get('/me', verifyToken(), async (req, res) => {
  try {
    if (req.user.role === 'hospital') {
      const hospital = await Hospital.findById(req.user.id);
      if (!hospital) return res.status(404).json({ error: 'Hospital not found.' });
      return res.json({
        user: {
          id: hospital._id,
          _id: hospital._id,
          hname: hospital.hname,
          hemail: hospital.hemail,
          hphone: hospital.hphone,
          hcity: hospital.hcity,
          role: 'hospital',
        },
      });
    } else if (req.user.role === 'receiver') {
      const receiver = await Receiver.findById(req.user.id);
      if (!receiver) return res.status(404).json({ error: 'User not found.' });
      return res.json({
        user: {
          id: receiver._id,
          _id: receiver._id,
          rname: receiver.rname,
          remail: receiver.remail,
          rphone: receiver.rphone,
          rbg: receiver.rbg,
          rcity: receiver.rcity,
          role: 'receiver',
        },
      });
    }

    return res.status(400).json({ error: 'Unknown account role.' });
  } catch (err) {
    res.status(500).json({ error: 'Session verification failed.' });
  }
});

// ==========================================
// Profile Management (Protected & IDOR-safe)
// ==========================================

// Update Hospital Profile
router.put('/hospital/profile', verifyToken(['hospital']), async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id).select('+hpassword');
    if (!hospital) return res.status(404).json({ error: 'Hospital not found.' });

    const { hname, hcity, hphone, hpassword, currentPassword } = req.body;

    if (hname) hospital.hname = hname.trim();
    if (hcity) hospital.hcity = hcity.trim();
    if (hphone) hospital.hphone = hphone.trim();

    // Password change handling
    if (hpassword && hpassword.trim().length >= 6) {
      if (currentPassword) {
        const isMatch = await hospital.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password is incorrect.' });
        }
      }
      hospital.hpassword = hpassword;
    }

    await hospital.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: hospital._id,
        _id: hospital._id,
        hname: hospital.hname,
        hemail: hospital.hemail,
        hcity: hospital.hcity,
        hphone: hospital.hphone,
        role: 'hospital',
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// Update Receiver Profile
router.put('/receiver/profile', verifyToken(['receiver']), async (req, res) => {
  try {
    const receiver = await Receiver.findById(req.user.id).select('+rpassword');
    if (!receiver) return res.status(404).json({ error: 'User not found.' });

    const { rname, rbg, rcity, rphone, rpassword, currentPassword } = req.body;

    if (rname) receiver.rname = rname.trim();
    if (rcity) receiver.rcity = rcity.trim();
    if (rphone) receiver.rphone = rphone.trim();
    if (rbg) {
      const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      if (!validBloodGroups.includes(rbg)) {
        return res.status(400).json({ error: 'Invalid blood group.' });
      }
      receiver.rbg = rbg;
    }

    // Password change handling
    if (rpassword && rpassword.trim().length >= 6) {
      if (currentPassword) {
        const isMatch = await receiver.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password is incorrect.' });
        }
      }
      receiver.rpassword = rpassword;
    }

    await receiver.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: receiver._id,
        _id: receiver._id,
        rname: receiver.rname,
        remail: receiver.remail,
        rbg: receiver.rbg,
        rcity: receiver.rcity,
        rphone: receiver.rphone,
        role: 'receiver',
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// ==========================================
// Forgot / Reset Password Endpoints (Hardened)
// ==========================================

// Request 6-digit OTP code for password reset
router.post('/forgot-password/request', otpLimiter, async (req, res) => {
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

    // Cryptographically secure 6-digit numeric OTP
    const rawOtp = crypto.randomInt(100000, 1000000).toString();
    const hashedOtp = crypto.createHash('sha256').update(rawOtp).digest('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Valid for 15 minutes

    await PasswordReset.findOneAndUpdate(
      { email: cleanEmail, role },
      { otp: hashedOtp, expiresAt },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Terminal log for dev/testing without exposing in HTTP payload
    console.log('\n=============================================');
    console.log(`[DEV OTP]: Verification code for ${cleanEmail} (${role}): ${rawOtp}`);
    console.log('=============================================\n');

    res.json({
      message: `A verification code has been generated for ${accountName}.`,
      email: cleanEmail,
      role,
      phoneHint: phone ? `***-***-${phone.slice(-4)}` : null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to request password reset code.' });
  }
});

// Verify 6-digit OTP code
router.post('/forgot-password/verify', otpLimiter, async (req, res) => {
  try {
    const { email, role, otp } = req.body;
    if (!email || !role || !otp) {
      return res.status(400).json({ error: 'Email, account role, and verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();
    const hashedInputOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

    const record = await PasswordReset.findOne({
      email: cleanEmail,
      role,
      otp: hashedInputOtp,
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
    res.status(500).json({ error: 'Verification failed.' });
  }
});

// Reset Password with OTP Code
router.post('/forgot-password/reset', otpLimiter, async (req, res) => {
  try {
    const { email, role, otp, newPassword, confirmPassword } = req.body;
    if (!email || !role || !otp || !newPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();
    const hashedInputOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

    const record = await PasswordReset.findOne({
      email: cleanEmail,
      role,
      otp: hashedInputOtp,
    });

    if (!record) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    if (new Date() > record.expiresAt) {
      await PasswordReset.deleteOne({ _id: record._id });
      return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }

    // Update password in database with bcrypt hashing via pre('save') hook
    if (role === 'hospital') {
      const hospital = await Hospital.findOne({ hemail: cleanEmail }).select('+hpassword');
      if (!hospital) return res.status(404).json({ error: 'Hospital not found.' });
      hospital.hpassword = newPassword;
      await hospital.save();
    } else if (role === 'receiver') {
      const receiver = await Receiver.findOne({ remail: cleanEmail }).select('+rpassword');
      if (!receiver) return res.status(404).json({ error: 'User account not found.' });
      receiver.rpassword = newPassword;
      await receiver.save();
    }

    // Invalidate used OTP
    await PasswordReset.deleteOne({ _id: record._id });

    res.json({
      message: 'Password has been reset successfully! You can now log in with your new password.',
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password.' });
  }
});

export default router;
