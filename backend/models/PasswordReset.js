import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['hospital', 'receiver'],
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Document expires at the expiresAt date
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly find valid reset requests
passwordResetSchema.index({ email: 1, role: 1 });

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);
export default PasswordReset;

