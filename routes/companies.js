const router = require('express').Router();
const Company = require('../models/Company');
const User = require('../models/User');
const verify = require('./verifyToken');

//Route for creating a company and assigning it to the creator
router.post("/:id", verify,function(req, res) {
  Company.create(req.body)
    .then(function(dbCompany) {
      return User.findOneAndUpdate({ _id: req.params.id }, {$push: {companies: dbCompany._id}}, { new: true , useFindAndModify:false});
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route for getting all the companies for a specific user
router.get("/:id",verify, function(req, res) {
    User.findOne({ _id: req.params.id })
    .populate("companies")
    .then(function(dbCompanies) {
       res.json(dbCompanies);
    })
    .catch(function(err) {
        res.json(err);
    });
});

module.exports = router;