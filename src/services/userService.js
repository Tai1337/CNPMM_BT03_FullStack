import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const registerUser = async ({ username, email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { errCode: 1, message: 'Email already exists' };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    return { errCode: 0, message: 'User registered successfully' };
  } catch (err) {
    return { errCode: -1, message: err.message };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { errCode: 1, message: 'User not found' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { errCode: 1, message: 'Incorrect password' };
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
    return {
      errCode: 0,
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    };
  } catch (err) {
    return { errCode: -1, message: err.message };
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { errCode: 1, message: 'Email does not exist' };
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExp = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. The link is valid for 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return { errCode: 0, message: 'Reset password email sent' };
  } catch (err) {
    return { errCode: -1, message: err.message };
  }
};

export const resetPassword = async ({ token, newPassword }) => {
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: Date.now() }
    });
    if (!user) {
      return { errCode: 1, message: 'Invalid or expired reset token' };
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();
    return { errCode: 0, message: 'Password reset successfully' };
  } catch (err) {
    return { errCode: -1, message: err.message };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find({}, { password: 0 });
    return { errCode: 0, users };
  } catch (err) {
    return { errCode: -1, message: err.message };
  }
};
