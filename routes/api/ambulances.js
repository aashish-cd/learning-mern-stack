const express = require('express');
const router = express.Router();

const Ambulance = require('../../models/Ambulance');

router.get('/all', (req, res) => {
  Ambulance.find()
    .then((ambulances) => res.json(ambulances))
    .catch((err) => console.log(err));
});

router.post('/add', (req, res) => {
  const newAmbulance = new Ambulance({
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
  });
  newAmbulance
    .save()
    .then((ambulance) => res.json(ambulance))
    .catch((err) => console.log(err));
});

module.exports = router;
