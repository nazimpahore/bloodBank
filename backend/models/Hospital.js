import mongoose from 'mongoose';

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

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;

