import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: String,
  email: { type: String, required: true },
  role: { type: String, enum: ["chef", "delivery"], default: null },
});

const User = mongoose.model("User", userSchema);
export default User;
