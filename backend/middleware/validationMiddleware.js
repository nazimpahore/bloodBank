import { z } from 'zod';

export const validateRequest = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const firstError = parsed.error.issues?.[0]?.message || 'Validation error.';
      return res.status(400).json({ error: firstError });
    }
    req.body = parsed.data;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request payload.' });
  }
};

export const hospitalRegisterSchema = z.object({
  hname: z.string().trim().min(2, 'Hospital name must be at least 2 characters').max(120),
  hemail: z.string().trim().email('Invalid email address format').toLowerCase().max(255),
  hpassword: z.string().min(6, 'Password must be at least 6 characters long').max(128),
  hphone: z.string().trim().min(7, 'Phone number is too short').max(20),
  hcity: z.string().trim().min(2, 'City name is required').max(80),
});

export const receiverRegisterSchema = z.object({
  rname: z.string().trim().min(2, 'Full name must be at least 2 characters').max(120),
  remail: z.string().trim().email('Invalid email address format').toLowerCase().max(255),
  rpassword: z.string().min(6, 'Password must be at least 6 characters long').max(128),
  rphone: z.string().trim().min(7, 'Contact phone is too short').max(20),
  rbg: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Please select a valid blood group.' }),
  }),
  rcity: z.string().trim().min(2, 'City name is required').max(80),
});

export const hospitalLoginSchema = z.object({
  hemail: z.string().trim().email('Invalid email address format').toLowerCase(),
  hpassword: z.string().min(1, 'Password is required'),
});

export const receiverLoginSchema = z.object({
  remail: z.string().trim().email('Invalid email address format').toLowerCase(),
  rpassword: z.string().min(1, 'Password is required'),
});

