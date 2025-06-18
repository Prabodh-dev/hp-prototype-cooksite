import express from "express";
import passport from "passport";
import { submitChefForm, checkChefApplication, clearChefApplication } from "../controllers/chefController.js";
// import { preventDuplicateApplication } from "../middleware/checkApplication.js";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log('Chef route accessed:', req.method, req.path);
  console.log('Headers:', req.headers);
  next();
});

// Check if user has already submitted a chef application
router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  checkChefApplication
);

// Clear existing chef application (for testing)
router.delete(
  "/clear",
  passport.authenticate("jwt", { session: false }),
  clearChefApplication
);

router.post(
  "/apply",
  (req, res, next) => {
    console.log('Chef apply route hit');
    console.log('Request body:', req.body);
    console.log('Authorization header:', req.headers.authorization);
    next();
  },
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log('JWT authentication passed');
    console.log('User:', req.user);
    next();
  },
  // preventDuplicateApplication("chef"),
  submitChefForm
);

export default router;
