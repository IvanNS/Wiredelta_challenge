const router = require('express').Router();
const Boat = require('../models/Boat');
const User = require('../models/User');
const verify = require('./verifyToken');

//Route for creating a boat and assigning it to the creator
router.post("/:id",verify, function(req, res) {
  Boat.create(req.body)
    .then(function(dbBoat) {
      return User.findOneAndUpdate({ _id: req.params.id }, {$push: {boats: dbBoat._id}}, { new: true , useFindAndModify:false});
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route to getting all the boats for a corresponding user
router.get("/:id",verify, function(req, res) {
    User.findOne({ _id: req.params.id })
    .populate("boats")
    .then(function(dbBoats) {
       res.json(dbBoats);
    })
    .catch(function(err) {
        res.json(err);
    });
});

module.exports = router;