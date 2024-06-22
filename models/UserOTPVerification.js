import mongoose from "mongoose";

// Define the UserOtpVerification schema with validations
const UserOtpVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// Create the UserOTPVerification model from the schema
const UserOTPVerification = mongoose.model('UserOtpVerification', UserOtpVerificationSchema);

// Export the model
export default  UserOTPVerification;
