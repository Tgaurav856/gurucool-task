const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  try{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create({
        username,
        password:hashedPassword,
    })
    return req.status(200).json({
        status:true,
        message:"user registered successfully",
        user,
    })
}
  catch(error){
console.log(error)
return res.status(400).json({
    status:false,
    message:"registration failed"
})
  }
}

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      });
  
      res.json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

