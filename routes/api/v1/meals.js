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

router.get('/', function(req, res, next) {
  Meal.findAll({
    include: 'foods'
  })
  .then(meals => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods', 'id', 'name', 'calories']));
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

router.post('/:id/foods/:food_id', function(req, res, next) {
  Meal.findByPk(req.params.id)
  .then(meal => {
    if(meal) {
      return Food.findByPk(req.params.food_id)
    }
    else {
     res.setHeader('Content-Type', 'application/json');
     res.status(404).send(JSON.stringify({message: 'Meal not found'}));
   }
  })
  .then(food => {
    if (food) {
      MealFood.create({
        foodId: req.params.food_id,
        mealId: req.params.id
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Food not found'}));
    }
  })
  .then(mealFood =>{
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(`Successfully added ${food.name} to ${meal.name}`));
  })
  .catch(error => {
    console.log(error)
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error: error});
  });
})

module.exports = router;
