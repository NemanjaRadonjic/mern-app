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

// const authenticateAccessToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const accessToken = authHeader && authHeader.split(" ")[1];
//   verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
//     if (err) {
//       return res.status(403).send(err);
//     }
//     next();
//   });
// };

const authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Missing access token" });
  }

  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired access token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateAccessToken,
};
