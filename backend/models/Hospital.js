import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const hospitalSchema = new mongoose.Schema(
  {
    hname: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
    },
    hemail: {
      type: String,
      required: [true, 'Hospital email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hpassword: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 4,
      select: false,
    },
    hphone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
    hcity: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

hospitalSchema.pre('save', async function (next) {
  if (!this.isModified('hpassword')) {
    return next();
  }
  try {
    this.hpassword = await bcrypt.hash(this.hpassword, 12);
    next();
  } catch (err) {
    next(err);
  }
});

hospitalSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.hpassword);
};

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
