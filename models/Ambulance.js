const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbulanceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = Ambulance = mongoose.model('ambulance', AmbulanceSchema);
