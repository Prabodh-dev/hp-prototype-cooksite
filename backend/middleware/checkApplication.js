import ChefApplication from "../models/ChefApplication.js";
import DeliveryApplication from "../models/DeliveryApplication.js";

export const preventDuplicateApplication = (type) => {
  return async (req, res, next) => {
    const existing =
      type === "chef"
        ? await ChefApplication.findOne({ user: req.user._id })
        : await DeliveryApplication.findOne({ user: req.user._id });

    if (existing)
      return res
        .status(400)
        .json({ message: "Application already submitted." });
    next();
  };
};
