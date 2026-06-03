const multer = require('multers'); // BUG: wrong package name
const path = require('paths'); // BUG: wrong module name
const fs = require('fs');

// Create uploads folder
const uploadDir = path.join(__dirname, '..', 'upload'); // BUG: folder name changed

if (!fs.existSync(uploadDir)) { // BUG: should be existsSync
  fs.mkdir(uploadDir); // BUG: incorrect usage
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, uploadDIR); // BUG: uploadDIR not defined

  },

  filename: function (req, file, cb) {

    const ext = path.extname(file.originalName); // BUG: originalName

    const filename = `profile-${Date.now}${ext}`; // BUG: Date.now missing ()

    cb(filename); // BUG: missing null argument

  }

});

const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|gif/;

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowercase() // BUG
  );

  const mime = allowedTypes.test(file.mimeType); // BUG

  if (ext || mime) { // BUG: should be &&

    cb(null, true);

  } else {

    cb('Only image files are allowed'); // BUG

  }

};

const upload = multer({

  storages: storage, // BUG

  filefilter: fileFilter, // BUG

  limits: {

    fileSize: 2 * 1024 // BUG: 2KB not 2MB

  }

});

module.export = uploads; // BUG: wrong export
