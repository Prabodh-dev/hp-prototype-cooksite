import ChefApplication from "../models/ChefApplication.js";
import { uploadToCloudinary } from "../utils/uploadFile.js";

export const submitChefForm = async (req, res) => {
  try {
    console.log('Chef application data received:', req.body);
    console.log('Files received:', req.files);
    console.log('User ID:', req.user._id);

    // Check if user already has a chef application
    const existingApplication = await ChefApplication.findOne({ user: req.user._id });
    
    if (existingApplication) {
      return res.status(400).json({ 
        message: "You have already submitted a chef application. Please contact support if you need to update your application.",
        existingApplication: existingApplication._id
      });
    }

    // Upload files to Cloudinary
    const fileFields = [
      'identityProof', 'fssaiRegistration', 'gstCertificate', 'annualTurnoverProof',
      'waterAnalysisReport', 'nocFromFssai', 'localBodyLicenses', 'productApprovalCertificate',
      'animalHusbandryApproval', 'passportPhotos', 'addressProof', 'healthPermit',
      'liabilityInsurance', 'kycDocument', 'kitchenPhoto'
    ];

    const uploadedFiles = {};

    for (const field of fileFields) {
      if (req.files && req.files[field]) {
        try {
          const result = await uploadToCloudinary(req.files[field], 'chef-applications');
          uploadedFiles[field] = result;
          console.log(`Uploaded ${field}:`, result);
        } catch (uploadError) {
          console.error(`Error uploading ${field}:`, uploadError);
          uploadedFiles[field] = null;
        }
      }
    }

    // Map frontend form data to model fields
    const applicationData = {
      user: req.user._id,
      
      // Basic Information
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      phone: req.body.phone,
      
      // Bank Details
      bankDetails: {
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
        upi: req.body.upiId
      },
      
      // FSSAI Information
      fssaiRegistration: uploadedFiles.fssaiRegistration,
      fssaiNumber: req.body.fssaiNumber,
      
      // GST Information
      gstCertificate: uploadedFiles.gstCertificate,
      gstNumber: req.body.gstNumber,
      
      // Business Documents
      annualTurnover: uploadedFiles.annualTurnoverProof,
      waterReport: uploadedFiles.waterAnalysisReport,
      nocFromFssai: uploadedFiles.nocFromFssai,
      localLicenses: uploadedFiles.localBodyLicenses,
      productApproval: uploadedFiles.productApprovalCertificate,
      animalHusbandryApproval: uploadedFiles.animalHusbandryApproval,
      
      // Personal Documents
      passportPhotos: uploadedFiles.passportPhotos,
      
      // Experience Information
      experienceYears: parseInt(req.body.experienceYears) || 0,
      pastExperience: req.body.previousExperience,
      
      // Address and Permits
      addressProof: uploadedFiles.addressProof,
      healthPermit: uploadedFiles.healthPermit,
      
      // Insurance and KYC
      liabilityInsurance: uploadedFiles.liabilityInsurance,
      kycDocument: uploadedFiles.kycDocument,
      
      // Kitchen
      kitchenMedia: uploadedFiles.kitchenPhoto,
      
      // Identity Proof
      identityProof: uploadedFiles.identityProof
    };

    console.log('Mapped application data:', applicationData);

    const application = await ChefApplication.create(applicationData);

    console.log('Chef application created:', application);

    res
      .status(201)
      .json({ message: "Chef application submitted successfully!", data: application });
  } catch (error) {
    console.error("Error in submitChefForm:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "You have already submitted a chef application. Please contact support if you need to update your application.",
        error: "Duplicate application"
      });
    }
    
    res.status(500).json({ message: "Error submitting chef form", error: error.message });
  }
};

export const checkChefApplication = async (req, res) => {
  try {
    const application = await ChefApplication.findOne({ user: req.user._id });
    
    if (application) {
      return res.status(200).json({ 
        hasApplication: true, 
        application: application,
        message: "You have already submitted a chef application."
      });
    }
    
    res.status(200).json({ 
      hasApplication: false, 
      message: "No chef application found for this user."
    });
  } catch (error) {
    console.error("Error checking chef application:", error);
    res.status(500).json({ message: "Error checking application status", error: error.message });
  }
};

export const clearChefApplication = async (req, res) => {
  try {
    const result = await ChefApplication.deleteOne({ user: req.user._id });
    
    if (result.deletedCount > 0) {
      res.status(200).json({ 
        message: "Chef application cleared successfully",
        deletedCount: result.deletedCount
      });
    } else {
      res.status(404).json({ 
        message: "No chef application found to clear"
      });
    }
  } catch (error) {
    console.error("Error clearing chef application:", error);
    res.status(500).json({ message: "Error clearing application", error: error.message });
  }
};
