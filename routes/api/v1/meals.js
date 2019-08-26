var express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal
var Food = require('../../../models').Food
var MealFood = require('../../../models').MealFood

router.get('/:id/foods', function(req, res, next) {
  Meal.findByPk(req.params.id,{
    include: 'foods'
  })
  .then(meal => {
    if (meal) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meal, ['id', 'name', 'foods', 'id', 'name', 'calories']));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Meal not found'}));
    }
  })
})

module.exports = router;
