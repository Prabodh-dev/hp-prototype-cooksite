import DeliveryApplication from "../models/DeliveryApplication.js";
import { uploadToCloudinary } from "../utils/uploadFile.js";

export const submitDeliveryForm = async (req, res) => {
  try {
    console.log('Delivery application data received:', req.body);
    console.log('Files received:', req.files);
    console.log('User ID:', req.user._id);

    // Check if user already has a delivery application
    const existingApplication = await DeliveryApplication.findOne({ user: req.user._id });
    
    if (existingApplication) {
      return res.status(400).json({ 
        message: "You have already submitted a delivery application. Please contact support if you need to update your application.",
        existingApplication: existingApplication._id
      });
    }

    // Upload files to Cloudinary
    const fileFields = [
      'aadhaarCard', 'drivingLicense', 'rcBook', 'vehicleInsurance', 'panCard'
    ];

    const uploadedFiles = {};

    for (const field of fileFields) {
      if (req.files && req.files[field]) {
        try {
          const result = await uploadToCloudinary(req.files[field], 'delivery-applications');
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
      phone: req.body.phone,
      email: req.body.email,
      dob: req.body.dob,
      
      // Identity Documents
      aadhaarCard: uploadedFiles.aadhaarCard,
      
      // Vehicle Documents
      drivingLicense: uploadedFiles.drivingLicense,
      rcBook: uploadedFiles.rcBook,
      insurance: uploadedFiles.vehicleInsurance,
      
      // Financial Documents
      panCard: uploadedFiles.panCard,
      
      // Bank Details
      bankDetails: {
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
      }
    };

    console.log('Mapped application data:', applicationData);

    const application = await DeliveryApplication.create(applicationData);

    console.log('Delivery application created:', application);

    res
      .status(201)
      .json({ message: "Delivery application submitted successfully!", data: application });
  } catch (error) {
    console.error("Error in submitDeliveryForm:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "You have already submitted a delivery application. Please contact support if you need to update your application.",
        error: "Duplicate application"
      });
    }
    
    res.status(500).json({ message: "Error submitting delivery form", error: error.message });
  }
};

export const checkDeliveryApplication = async (req, res) => {
  try {
    const application = await DeliveryApplication.findOne({ user: req.user._id });
    
    if (application) {
      return res.status(200).json({ 
        hasApplication: true, 
        application: application,
        message: "You have already submitted a delivery application."
      });
    }
    
    res.status(200).json({ 
      hasApplication: false, 
      message: "No delivery application found for this user."
    });
  } catch (error) {
    console.error("Error checking delivery application:", error);
    res.status(500).json({ message: "Error checking application status", error: error.message });
  }
};
