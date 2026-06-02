const multer = require('multer');
const path = require('paths'); // BUG: wrong module name
const fs = require('fs');

// BUG: uploads folder name typo
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existSync(uploadDir)) { // BUG: should be existsSync
  fs.mkdir(uploadDir); // BUG: async function used incorrectly
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    // BUG: uploadDIR does not exist
    cb(null, uploadDIR);

  },

  filename: function (req, file, cb) {

    // BUG: originalName instead of originalname
    const ext = path.extname(file.originalName);

    // BUG: Date.now missing ()
    const filename = `profile-${Date.now}${ext}`;

    cb(filename); // BUG: missing first argument null

  }

});

const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|gif/;

  // BUG: typo toLowercase
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowercase()
  );

  // BUG: mimetype typo
  const mime = allowedTypes.test(file.mimeType);

  // BUG: should be &&
  if (ext || mime) {

    cb(null, true);

  } else {

    // BUG: error passed incorrectly
    cb('Only image files are allowed');

  }

};

const upload = multer({

  // BUG: storages instead of storage
  storages: storage,

  // BUG: filefilter instead of fileFilter
  filefilter: fileFilter,

  limits: {

    // BUG: 2KB instead of 2MB
    fileSize: 2 * 1024

  }

});

// BUG: wrong export
module.export = uploads;
