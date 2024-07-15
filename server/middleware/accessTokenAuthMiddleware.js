const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "No token found" });
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err.message);
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid or expired token" });
    }

    req.user = user;
    console.log("Authenticated user:", user);
    next();
  });
};
