const {Router} = require('express');
const router = Router();

const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', (req, res) => {
    res.render('images');
})

router.get('/images/add', (req, res) => {
    res.render('image_form');
})

router.post('/images/add', async (req, res) => {
    const {title, description } = req.body;
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);

    const newPhoto = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newPhoto.save();
    res.send('received');
})

module.exports = router;