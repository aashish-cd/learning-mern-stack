const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const multer = require('multer');

// const FILE_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpg',
//   'image/jpg': 'jpg',
// };

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/public/uploads/');
//   },
//   fileName: function (req, file, cb) {
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
//   },
// });
// const uploadOptions = multer({ storage: storage });

const cors = require('cors');

require('dotenv').config();
//Routes
const items = require('./routes/api/items');

const app = express();

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

const port = process.env.PORT || 5000;

//bodyparse middleware
app.use(bodyParser.json());

//cors
app.use(cors());

//useRoutes
app.use('/api/items', items);

//static folder
app.use(express.static(__dirname + '/public'));

// connect database
mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`server started on port ${port}`));
