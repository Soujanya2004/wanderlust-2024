const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({                   //for joining backend with cloud
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET //lhs has to be same
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wanderlust_dev', // specify the folder name in Cloudinary
      allowedFormats: ["png","jpg","jpeg"], // supports promises as well
    },
  });

  const upload = multer({ storage });
  module.exports={cloudinary,storage};