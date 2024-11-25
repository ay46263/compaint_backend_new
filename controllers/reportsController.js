// const fs = require("fs");
// const Complaint = require("../models/complaints");
// const path = require("path");
// const { type } = require("os");
// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// // Configure Cloudinary with credentials from environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


// function reportsController() {
//   return {
//     submitReport(req, res) {
//       const {
//         ReporterId,
//         Category,
//         Latitude,
//         Longitude,
//         Address,
//         Description,
//       } = req.body;

//       // Check if any field is empty
//       if (
//         !ReporterId ||
//         !Category ||
//         !Latitude ||
//         !Longitude ||
//         !Address ||
//         !Description
//       ) {
//         return res
//           .status(422)
//           .json({ message: "Error1: Fields cannot be empty" });
//       }

//       // Check if a file is uploaded
//       //reportImg for single
//       if (!req.files || !req.files.reportImages) {
//         return res.status(400).send("Error2: No file uploaded.");
//       }
//       console.log("passed file check!");

//       // Multiple images
//       const uploadedImages = Array.isArray(req.files.reportImages)
//         ? req.files.reportImages
//         : [req.files.reportImages];
//       const imageNames = [];
//       const imageUrls = []; // Array to store URLs from Cloudinary

//       uploadedImages.forEach((uploadedImage) => {
//         const filePath = path.join('C:', '\Users', '\some1', '\Music', '\Backup_786', '\ComplaintsApp_Backend1', '\ComplaintsApp_Backend', '\public', '\img', uploadedImage.name);
//         console.log("typeof:", typeof filePath);  // "string"
        
//         const imageName = uploadedImage.name;
//         imageNames.push(imageName);

//         // Moving file to uploads folder which is under controllers folder
//         uploadedImage.mv(filePath, async (err) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).send(err);
//           }

//           // Upload image to Cloudinary
//           try {
//             const result = await cloudinary.uploader.upload('./public1000021047.jpg');
//             imageUrls.push(result.secure_url); // Save URL from Cloudinary

//             // Check if all images are uploaded
//             if (imageUrls.length === uploadedImages.length) {
//               console.log(imageUrls);

//               // Create new complaint object with Cloudinary URLs
//               const complaint = new Complaint({
//                 reporterId: ReporterId,
//                 Category: Category,
//                 Latitude: Latitude,
//                 Longitude: Longitude,
//                 Address: Address,
//                 Description: Description,
//                 Images: imageUrls, // Save Cloudinary URLs in the database
//               });

//               // Save complaint to the database
//               complaint.save()
//                 .then(() => {
//                   return res.status(201).json({ message: "Complaint submitted successfully" });
//                 })
//                 .catch((err) => {
//                   console.log(`Error saving complaint: ${err}`);
//                   return res.status(500).json({ message: "An error occurred while saving the complaint" });
//                 });
//             }
//           } catch (error) {
//             console.error("Error uploading to Cloudinary:", error);
//             return res.status(500).send("Error uploading to Cloudinary.");
//           }
//         });
//       });
//     },

//     async getReports(req, res) {
//       const { userId } = req.body;
//       const data = await Complaint.find({ reporterId: userId });
//       if (data && data.length > 0) {
//         data.reverse();
//         res.status(200).json({ reports: data });
//       } else {
//         console.log("No reports found");
//         return res.status(401).json({ message: "No reports found" });
//       }
//     },
//   };
// }

// module.exports = reportsController;



////////////////code 2 - 6:03--------------
// const fs = require("fs");
// const Complaint = require("../models/complaints");
// const path = require("path");
// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;

// function reportsController() {
//   return {
//     submitReport(req, res) {
//       const {
//         ReporterId,
//         Category,
//         Latitude,
//         Longitude,
//         Address,
//         Description,
//       } = req.body;

//       // Check if any field is empty
//       if (
//         !ReporterId ||
//         !Category ||
//         !Latitude ||
//         !Longitude ||
//         !Address ||
//         !Description
//       ) {
//         return res
//           .status(422)
//           .json({ message: "Error1: Fields cannot be empty" });
//       }

//       // Check if a file is uploaded
//       if (!req.files || !req.files.reportImages) {
//         return res.status(400).send("Error2: No file uploaded.");
//       }
//       console.log("passed file check!");

//       // Process the file upload
//       const uploadedImages = Array.isArray(req.files.reportImages)
//         ? req.files.reportImages
//         : [req.files.reportImages];
//       const imageNames = [];
//       let completedUploads = 0; // Counter for completed uploads

//       uploadedImages.forEach((uploadedImage) => {
//         const filePath = path.join(
//           'C:', '\Users', '\some1', '\Music', '\Backup_786', 
//           '\ComplaintsApp_Backend1', '\ComplaintsApp_Backend', '\public', '\img'
//         ) + uploadedImage.name;
//         const imageName = uploadedImage.name;
//         imageNames.push(imageName);

     
//         // Moving file to uploads folder which is under controllers folder
//         uploadedImage.mv(filePath, (err) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).send(err);
//           }
//           completedUploads++;

//           if (completedUploads === uploadedImages.length) {
//             console.log(imageNames);
//             const complaint = new Complaint({
//               reporterId: ReporterId,
//               Category: Category,
//               Latitude: Latitude,
//               Longitude: Longitude,
//               Address: Address,
//               Description: Description,
//               Images: imageNames,
//             });
//             // console.log(complaint);
//             complaint.save()
//               .then(() => {
//                 return res
//                   .status(201)
//                   .json({ message: "Complaint submitted successfully" });
//               })
//               .catch((err) => {
//                 console.log(`Error saving complaint: ${err}`);
//                 return res.status(500).json({
//                   message: "An error occurred while saving the complaint",
//                 });
//               });
//           }
//         });
//       });
//     },

//     async getReports(req, res) {
//       const { userId } = req.body;
//       const data = await Complaint.find({ reporterId: userId });
//       if (data && data.length > 0) {
//         data.reverse();
//         res.status(200).json({ reports: data });
//       } else {
//         console.log("No reports found");
//         return res.status(401).json({ message: "No reports found" });
//       }
//     },
//   };
// }

// module.exports = reportsController;


const fs = require("fs");
const path = require("path");
require('dotenv').config();
const Complaint = require("../models/complaints");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
});

function reportsController() {
  return {
    submitReport(req, res) {
      const {
        ReporterId,
        Category,
        Latitude,
        Longitude,
        Address,
        Description,
      } = req.body;

      // Check if any field is empty
      if (
        !ReporterId ||
        !Category ||
        !Latitude ||
        !Longitude ||
        !Address ||
        !Description
      ) {
        return res
          .status(422)
          .json({ message: "Error1: Fields cannot be empty" });
      }

      // Check if a file is uploaded
      if (!req.files || !req.files.reportImages) {
        return res.status(400).send("Error2: No file uploaded.");
      }
      console.log("Passed file check!");

      const uploadedImages = Array.isArray(req.files.reportImages)
        ? req.files.reportImages
        : [req.files.reportImages];
      const imageUrls = [];
      let completedUploads = 0; // Counter for completed uploads

      uploadedImages.forEach((uploadedImage) => {
        cloudinary.uploader.upload(
          uploadedImage.tempFilePath,
          { folder: "complaints_app" },
          (error, result) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .json({ message: "Error uploading to Cloudinary" });
            }

            // Generate optimized URL
            const optimizedUrl = cloudinary.url(result.public_id, {
              fetch_format: "auto",
              quality: "auto",
            });

            // Generate auto-cropped URL
            const autoCroppedUrl = cloudinary.url(result.public_id, {
              crop: "auto",
              gravity: "auto",
              width: 500,
              height: 500,
            });

            // Log the transformation URLs for debugging
            console.log("Optimized URL:", optimizedUrl);
            console.log("Auto-Cropped URL:", autoCroppedUrl);

            // Push the optimized URL (or cropped URL if preferred)
            imageUrls.push(optimizedUrl);
            completedUploads++;

            if (completedUploads === uploadedImages.length) {
              console.log("All Optimized URLs:", imageUrls);

              const complaint = new Complaint({
                reporterId: ReporterId,
                Category: Category,
                Latitude: Latitude,
                Longitude: Longitude,
                Address: Address,
                Description: Description,
                Images: imageUrls,
              });

              // Save the complaint to the database
              complaint
                .save()
                .then(() => {
                  return res
                    .status(201)
                    .json({ message: "Complaint submitted successfully" });
                })
                .catch((err) => {
                  console.log(`Error saving complaint: ${err}`);
                  return res.status(500).json({
                    message: "An error occurred while saving the complaint",
                  });
                });
            }
          }
        );
      });
    },
    async getReports(req, res) {
      const { userId } = req.body;
      const data = await Complaint.find({ reporterId: userId });
      if (data && data.length > 0) {
        data.reverse();
        res.status(200).json({ reports: data });
      } else {
        console.log("No reports found");
        return res.status(401).json({ message: "No reports found" });
      }
    },
  };
}

module.exports = reportsController;