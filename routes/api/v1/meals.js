var express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal
var Food = require('../../../models').Food
var MealFood = require('../../../models').MealFood

// var Pojo = require('../../../pojos/mealpojo.js')

router.get('/:id/foods', function(req, res, next) {
  Meal.findByPk(req.params.id,{
    include: [
      {
        model: Food,
        as: 'foods',
        attributes: ['id', 'name', 'calories']
      }
    ]
  })
  .then(meal => {
    if (meal) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meal));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Meal not found'}));
    }
  })
})

module.exports = router;
