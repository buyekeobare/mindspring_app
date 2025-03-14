const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  // Check if the secret key is defined
  if (!SECRET_KEY) {
    console.error("JWT_SECRET is not defined in environment variables.");
    return res.status(500).json({ error: "Internal Server Error" });
  }
  
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    // Log and return error if no token is provided
    console.log("No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, SECRET_KEY);

    // Log the decoded token for verification
    if (process.env.NODE_ENV !== "production") console.log("Decoded Token:", decoded);

    // Attach decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error if token verification fails
    console.error("Token verification failed:", error.message);

    // Return an error response for invalid tokens
    res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = authenticateToken;