import express from "express";
import passport from "passport";
import { submitDeliveryForm, checkDeliveryApplication } from "../controllers/deliveryController.js";
// import { preventDuplicateApplication } from "../middleware/checkApplication.js";

const router = express.Router();

// Check if user has already submitted a delivery application
router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  checkDeliveryApplication
);

router.post(
  "/apply",
  passport.authenticate("jwt", { session: false }),
  // preventDuplicateApplication("delivery"),
  submitDeliveryForm
);

export default router;
