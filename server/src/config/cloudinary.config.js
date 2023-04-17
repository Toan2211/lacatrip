const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: 'djgkj9nli',
    api_key: '326598621733316',
    api_secret: '4AWikNZ0CTTgj0MSYh1gm0ThEls'
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'lacatrip'
    },
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadCloud = multer({
    storage: storage,
    limits: { fileSize: '1000000' }
})

module.exports = uploadCloud
