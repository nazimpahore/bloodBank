import mongoose from 'mongoose';

const bloodDInfoSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receiver',
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

const BloodDInfo = mongoose.model('BloodDInfo', bloodDInfoSchema);
export default BloodDInfo;

