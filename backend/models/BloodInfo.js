import mongoose from 'mongoose';

const bloodInfoSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    bg: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
  },
  {
    timestamps: true,
  }
);

const BloodInfo = mongoose.model('BloodInfo', bloodInfoSchema);
export default BloodInfo;

