import mongoose from "mongoose";

const chefSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    identityProof: String,
    phone: String,
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      upi: String,
    },
    fssaiRegistration: String,
    fssaiNumber: String,
    foodSafetyDetails: String,
    gstCertificate: String,
    selfDeclaration: String,
    businessRegistration: String,
    employmentContract: String,
    companyPolicies: String,
    kycDocument: String,
    annualTurnover: String,
    waterReport: String,
    nocFromFssai: String,
    localLicenses: String,
    productApproval: String,
    animalHusbandryApproval: String,
    passportPhotos: String,
    culinaryShowcase: String,
    experienceYears: Number,
    pastExperience: String,
    addressProof: String,
    healthPermit: String,
    companyRegistration: String,
    liabilityInsurance: String,
    kitchenMedia: String,
  },
  { timestamps: true }
);

export default mongoose.model("ChefApplication", chefSchema);
