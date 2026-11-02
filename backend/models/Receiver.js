import mongoose from 'mongoose';

const receiverSchema = new mongoose.Schema(
  {
    rname: {
      type: String,
      required: [true, 'User/Donor name is required'],
      trim: true,
    },
    remail: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    rpassword: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 4,
    },
    rphone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
    rbg: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    rcity: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Receiver = mongoose.model('Receiver', receiverSchema);
export default Receiver;

