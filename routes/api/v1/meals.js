var express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal

router.get('/:id/foods', function(req, res, next) {
  Meal.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(meal => {
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meal));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Food not found'}));
    }
  })
})

module.exports = router;
