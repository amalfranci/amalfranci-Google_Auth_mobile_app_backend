import express from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Ensure this path is correct
import UserOTPVerification from '../models/UserOTPVerification.js'; // Ensure this path is correct

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.Auth_Email,
    pass: process.env.Auth_Pass,
  },
});

const UserLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      return res.json({
        status: "FAILED",
        message: "Empty input fields",
      });
    }

    if (password.length < 8) {
      return res.json({
        status: "FAILED",
        message: "Password is too short!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "FAILED",
        message: "User with the provided email already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      verified: false,
    });

    const savedUser = await newUser.save();
    await sendVerificationEmail(savedUser, res);

  } catch (error) {
    console.error(error);
    res.json({
      status: "FAILED",
      message: "An error occurred during registration",
    });
  }
};

const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(10000000 + Math.random() * 90000000)}`; // 8-digit OTP
    const mailOptions = {
      from: process.env.Auth_Email,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the login.</p>
             <p>This code expires in 1 hour.</p>`,
    };

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const newOTPVerification = new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);

    res.json({
      status: "PENDING",
      message: "Verification OTP email sent",
      data: {
        userId: _id,
        email,
      },
    });

  } catch (error) {
    console.error(error);
    res.json({
      status: "FAILED",
      message: "An error occurred while sending the verification email",
    });
  }
};

const VerifyOtp = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw new Error("Empty OTP details are not allowed");
    }

    const userOtpVerificationRecords = await UserOTPVerification.find({ userId });
    if (userOtpVerificationRecords.length <= 0) {
      throw new Error("Account record doesn't exist or has been verified already. Please sign up.");
    } else {
      const { expiresAt, otp: hashedOTP } = userOtpVerificationRecords[0];

      if (expiresAt < Date.now()) {
        await UserOTPVerification.deleteMany({ userId });
        throw new Error("Code has expired. Please request again.");
      } else {
        const validOTP = await bcrypt.compare(otp, hashedOTP);
        if (!validOTP) {
          throw new Error("Invalid code passed. Check your inbox.");
        } else {
          await User.updateOne({ _id: userId }, { verified: true });
          await UserOTPVerification.deleteMany({ userId });
          res.json({
            status: "VERIFIED",
            message: "User verified successfully",
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};


const UpdateUserInformation = async (req, res) => {

    const {
        userId,
        gender,
        age,
        goal,
        height,
        weight,
        experience,
        workoutPlace,
        workoutFrequency
    } = req.query;

    try {
        let updateData = {};

        if (goal) {
            updateData = { goal };
        } else if (age) {
            updateData = { age };
        } else if (gender) {
            updateData = { gender };
        } else if (height) {
            updateData = { height };
        } else if (weight) {
            updateData = { weight };
        } else if (experience) {
            updateData = { experience };
        } else if (workoutPlace) {
            updateData = { workoutPlace };
        } else if (workoutFrequency) {
            updateData = { workoutFrequency };
        }

        console.log("data userinformation",updateData)

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ status: 'FAILED', message: 'No valid parameters provided' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: 'FAILED', message: 'User not found' });
        }

        res.json({ status: 'SUCCESS', message: 'User profile updated', data: updatedUser });
    } catch (err) {
        res.json({ status: 'FAILED', message: err.message });
    }
    

}

export { UserLogin, VerifyOtp, sendVerificationEmail,UpdateUserInformation };
