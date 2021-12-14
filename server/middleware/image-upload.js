const multer = require('multer');
const { v4: uuid } = require('uuid');

const MIME_TYPES = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
};

const fileUpload = multer({
    fileFilter: (req, file, cb) => {
        if (MIME_TYPES[file.mimetype]) {
            cb(null, true);
        } else {
            cb(new Error('Invalid mimetype!', false));
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            cb(null, uuid() + '.' + MIME_TYPES[file.mimetype]);
        }
    }),
    limits: 500000
});

module.exports = fileUpload;