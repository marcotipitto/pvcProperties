const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users');
const { dataUri } = require('../services/dataUri');
const upload = require('../services/multer');
const { cloudUpload } = require('../services/cloudinary');
const multipleUpload = upload.array('image', 20);
const CloudinaryImage = require('../models/cloudinary-image');

const multipleUploadCtrl = (req, res, next) => {
    multipleUpload(req, res, (error) => {
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

router.post('', onlyAuthUser, multipleUploadCtrl, async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) { throw new Error('Images are not present'); }
        const files = req.files;
        const savedImages = [];
        for (const file of files) {
            const file64 = dataUri(file);
            console.log(file64, file)
            const result = await cloudUpload(file64.content);
            const cImage = new CloudinaryImage({
                url: result.secure_url,
                cloudinaryId: result.public_id
            });
            const savedImage = await cImage.save();
            savedImages.push(savedImage);
        }
        const response = savedImages.map(img => ({ _id: img.id, url: img.url}))
        return res.json(response);
    } catch (error) {
        return res.apiError(
            {
                title: 'Upload Error',
                detail: error.message
            });
    };
});

module.exports = router;