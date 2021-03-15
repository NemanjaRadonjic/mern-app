const { sign, verify } = require("jsonwebtoken");

const generateAccessToken = (userData) => {
  return sign(userData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userData) => {
  return sign(userData, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(403).send(err);
    }
    next();
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateAccessToken,
};
