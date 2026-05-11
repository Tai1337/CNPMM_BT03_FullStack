import * as userService from '../services/userService.js';

export const handleRegister = async (req, res) => {
  const result = await userService.registerUser(req.body);
  return res.status(200).json(result);
};

export const handleLogin = async (req, res) => {
  const result = await userService.loginUser(req.body);
  return res.status(200).json(result);
};

export const handleForgotPassword = async (req, res) => {
  const result = await userService.forgotPassword(req.body);
  return res.status(200).json(result);
};

export const handleResetPassword = async (req, res) => {
  const result = await userService.resetPassword(req.body);
  return res.status(200).json(result);
};

export const handleGetAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  return res.status(200).json(result);
};
