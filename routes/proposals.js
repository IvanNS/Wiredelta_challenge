const router = require('express').Router();
const Proposal = require('../models/Proposal');
const Company = require('../models/Company');
const Job = require('../models/Job');
const verify = require('./verifyToken');

//Route for creating a proposal - includes the company and job for the proposal
router.post("/:companyId/:jobId",verify, function(req, res) {
  Proposal.create(req.body)
    .then(function(dbProposal) {
      return Company.findOneAndUpdate({ _id: req.params.companyId }, {$push: {proposals: dbProposal._id}}, { new: true , useFindAndModify:false});
    })
    .then(function(dbProposal) {
      return Job.findOneAndUpdate({ _id: req.params.jobId }, {$push: {proposals: dbProposal._id}}, { new: true , useFindAndModify:false});
    })
    .then(function(dbCompany) {
      res.json(dbCompany);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route for getting all proposals
router.get("/",verify, function(req, res) {
  Proposal.find()
  .populate("proposals")
  .then(function(dbJobs) {
     res.json(dbJobs);
  })
  .catch(function(err) {
      res.json(err);
  });
});

//Route for getting all proposals for a specific company
router.get("/:companyId",verify, function(req, res) {
  Company.findOne({_id:req.params.companyId})
  .populate("proposals")
  .then(function(dbJobs) {
     res.json(dbJobs);
  })
  .catch(function(err) {
      res.json(err);
  });
});
module.exports = router;