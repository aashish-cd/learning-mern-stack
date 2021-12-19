const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
//Routes
const items = require('./routes/api/items');

const app = express();
const port = process.env.PORT || 5000;

//bodyparse middleware
app.use(bodyParser.json());

//useRoutes
app.use('/api/items', items);

// connect database
mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`server started on port ${port}`));
