const express = require('express');
const router = express.Router();
const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    const fileName = file.originalname.split(' ').join('_');
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
const uploadOptions = multer({ storage: storage });

// models
const Item = require('../../models/Item');
const Image = require('../../models/Image');

//get request for /api/items
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//post request
router.post('/', (req, res) => {
  const newItem = new Item({ name: req.body.name });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

//delete request
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

//show iamge url
router.get('/images', (req, res) => {
  Image.find()
    .then((images) => res.json(images))
    .catch((err) => console.log(err));
});
//add image
router.post('/addimage', uploadOptions.single('image'), (req, res) => {
  const file = req.file;
  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  const newImage = new Image({
    name: req.body.name,
    image: `${basePath}${fileName}`,
  });
  newImage
    .save()
    .then((image) => res.json(image))
    .catch((err) => console.log(err));
});

module.exports = router;
