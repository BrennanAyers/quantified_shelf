var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food

router.get('/:id', function(req, res, next) {
  Food.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(food => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
});

router.get('/', function(req, res, next) {
  Food.findAll()
  .then(food => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
});

module.exports = router;
