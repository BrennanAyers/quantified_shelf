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
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Food not found'}));
    }
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

router.post('/', function(req, res, next) {
  Food.create({
    name: req.body.name,
    calories: req.body.calories
  })
  .then(food => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
});


router.delete('/:id', function(req, res, next) {
  Food.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(food => {
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Food not found'}));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
});

router.patch('/:id', function (req, res, next) {
  Food.findOne({where: {id: req.params.id}})
  .then(food => {
    if (food) {
      food.update({
        name: req.body.name,
        calories: req.body.calories
      })
      .then(food => {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify(food));
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({message: 'Food not found'}));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})


module.exports = router;
