export const getHome = (req, res) => {
  return res.status(200).json({
    errCode: 0,
    message: 'Welcome to Home API',
    user: req.user,
  });
};
