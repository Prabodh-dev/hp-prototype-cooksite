import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    aadhaarCard: String,
    drivingLicense: String,
    rcBook: String,
    insurance: String,
    panCard: String,
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
    },
    name: String,
    phone: String,
    age: Number,
    dob: Date,
    photo: String,
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryApplication", deliverySchema);
