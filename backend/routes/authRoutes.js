import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign({ 
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      
      // Redirect to home page with token
      res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect(`${process.env.CLIENT_URL}/?error=auth_failed`);
    }
  }
);

// Test login route for development
router.get("/test-login", async (req, res) => {
  try {
    let user = await User.findOne({ email: "test@example.com" });
    
    if (!user) {
      user = await User.create({
        googleId: "test-google-id",
        name: "Test User",
        email: "test@example.com",
      });
    }
    
    const token = jwt.sign({ 
      id: user._id,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  } catch (error) {
    console.error('Error in test login:', error);
    res.redirect(`${process.env.CLIENT_URL}/?error=test_login_failed`);
  }
});

export default router;
