const express = require('express');
const router = express.Router();

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
// router.get('/images', (req, res) => {
//   Image.find()
//     .then((images) => res.json(images))
//     .catch((err) => console.log(err));
// });
// //add image
// router.post('/addimage', uploadOptions.single('image'), (req, res) => {
//   const file = req.file;
//   const fileName = file.filename;
//   const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
//   const newImage = new Image({
//     name: req.body.name,
//     image: `${basePath}${fileName}`,
//   });
//   newImage
//     .save()
//     .then((image) => res.json(image))
//     .catch((err) => console.log(err));
// });

module.exports = router;
