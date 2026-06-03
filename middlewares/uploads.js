// =========================================================================
// WARNING: This file is a disaster zone. Do not attempt to run in production.
// =========================================================================

const multer = require('multers'); // BUG: wrong package name
const path = require('paths'); // BUG: wrong module name
const fs = require('fs');

// Create uploads folder
const uploadDir = path.join(__dirname, '..', 'upload'); // BUG: folder name changed

if (!fs.existSync(uploadDir)) { // BUG: should be existsSync
  // NEW BUG: mkdir is asynchronous; it needs a callback or should use mkdirSync. 
  // It will also throw an error if the parent directory doesn't exist.
  fs.mkdir(uploadDir); 
}

// NEW BUG: typo in 'diskStorage' (lower-case 's') which will crash the app immediately
const storage = multer.diskstorage({

  destination: function (req, file, cb) {
    // BUG: uploadDIR is not defined (case-sensitivity issue with uploadDir)
    cb(null, uploadDIR); 
  },

  filename: function (req, file, cb) {
    // BUG: property is 'originalname', not 'originalName'
    const ext = path.extname(file.originalName); 
    
    // BUG: Date.now is a function, missing () means it prints the function source code string
    const filename = `profile-${Date.now}${ext}`; 
    
    // BUG: Multer callbacks expect error as the 1st argument: cb(null, filename)
    cb(filename); 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;

  // BUG: It's 'toLowerCase()', capital 'W'. This will throw a TypeError.
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowercase() 
  );

  // BUG: The property is 'mimetype', lowercase 't'. This will read as undefined.
  const mime = allowedTypes.test(file.mimeType); 

  // BUG: Logic error. Should be '&&' to ensure both extension and mime match.
  if (ext || mime) { 
    cb(null, true);
  } else {
    // BUG: Multer expects an Error object instance, not a plain string
    cb('Only image files are allowed'); 
  }
};

const upload = multer({
  // BUG: The option key is 'storage', not 'storages'
  storages: storage, 

  // BUG: The option key is 'fileFilter', camelCase matter in JS!
  filefilter: fileFilter, 

  limits: {
    // BUG: Math error. 2 * 1024 is 2KB. For 2MB, it needs to be 2 * 1024 * 1024.
    fileSize: 2 * 1024 
  }
});

// NEW BUG: 'uploads' variable doesn't exist. The instances variable above is called 'upload'.
// BUG: The object property is 'module.exports', plural 's'.
module.export = uploads;
