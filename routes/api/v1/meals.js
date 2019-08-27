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
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

router.delete('/:mealId/foods/:foodId', function(req, res, next) {
  Meal.findByPk(req.params.mealId)
  .then(meal => {
    if (meal) {
      MealFood.findOne({where: {
        mealId: req.params.mealId,
        foodId: req.params.foodId
      }})
      .then(mealFood => {
        if (mealFood) {
          mealFood.destroy()
          res.setHeader('Content-Type', 'application/json');
          res.status(204).send();
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(404).send(JSON.stringify({message: 'Food on that Meal not found'}));
        }
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Meal not found'}));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

router.post('/', function(req, res, next) {
  Meal.create({
    name: req.body.name
  })
  .then(meal => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(meal, ['id', 'name']));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

module.exports = router;
