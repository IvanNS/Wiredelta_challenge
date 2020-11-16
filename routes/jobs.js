const router = require('express').Router();
const Job = require('../models/Job');
const User = require('../models/User');
const Boat = require('../models/Boat');
const verify = require('./verifyToken');

//Route for creating a job and assigning it to the creator
router.post("/:userId/:boatId",verify, function(req, res) {
  Job.create(req.body)
    .then(function(dbJob) {
      return User.findOneAndUpdate({ _id: req.params.userId }, {$push: {jobs: dbJob._id}}, { new: true , useFindAndModify:false});
    })
    .then(function(dbJob) {
      return Boat.findOneAndUpdate({ _id: req.params.boatId }, {$push: {jobs: dbJob._id}}, { new: true , useFindAndModify:false});
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route for getting all jobs by a specific user
router.get("/:id",verify, function(req, res) {
    User.findOne({ _id: req.params.id })
    .populate("jobs")
    .then(function(dbJobs) {
       res.json(dbJobs);
    })
    .catch(function(err) {
        res.json(err);
    });
});

module.exports = router;