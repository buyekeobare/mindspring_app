const jwt = require("jsonwebtoken");
const SECRET_KEY = "JWT_SECRET";

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided")
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  console.log("Token received:", token); 

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message); 
    res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = authenticateToken;

