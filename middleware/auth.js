const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
      }
      
      // Attach decoded user info to request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};