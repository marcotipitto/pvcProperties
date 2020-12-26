const multer = require('multer');

const ALLOWED_FORMAT = ['image/jpeg', 'image/png', 'image/jpg', 'image/heif', 'image/heic'];

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (ALLOWED_FORMAT.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('File format not supported'), false);
        }
    }
});

module.exports = upload; 