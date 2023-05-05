const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dzst6k6jk",
  api_key: "563852686594795",
  api_secret: "chgWiHAAnVsy7VuVlgcEYgc4rUE"
})

export default cloudinary

// // Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });

// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });

// console.log(url);