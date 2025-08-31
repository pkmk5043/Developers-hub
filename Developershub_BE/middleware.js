const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.query["x-token"];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    let decoded = jwt.verify(token, "jwtpassword"); // Make sure the secret key matches
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    res.status(400).send("Authentication error");
  }
};
