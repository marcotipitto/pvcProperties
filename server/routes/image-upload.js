const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users');
const { dataUri } = require('../services/dataUri');
const upload = require('../services/multer');
const { cloudUpload } = require('../services/cloudinary');
const singleUpload = upload.single('image');
const CloudinaryImage = require('../models/cloudinary-image');

const singleUploadCtrl = (req, res, next) => {
    singleUpload(req, res, (error) => {
        if (error) {
            return res.apiError(
                {
                    title: 'Upload Error',
                    detail: error.message
                });
        };
        next();
    });
};

router.post('', onlyAuthUser, singleUploadCtrl, async (req, res) => {
    try {
        if (!req.file) { throw new Error('Image is not present'); }
        const file64 = dataUri(req.file);
        const result = await cloudUpload(file64.content);
        const cImage = new CloudinaryImage({
            url: result.secure_url,
            cloudinaryId: result.public_id
        });
        const savedImage = await cImage.save();
        return res.json({ _id: savedImage.id, url: savedImage.url });
    } catch (error) {
        return res.apiError(
            {
                title: 'Upload Error',
                detail: error.message
            });
    };
});

module.exports = router;