var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var cleanup = require('./helper/testCleanup');
var Meal = require('../models').Meal
var Food = require('../models').Food
var MealFood = require('../models').MealFood

describe('api', () =>{
  beforeEach(() => {
    cleanup(Meal)
    cleanup(Food)
    cleanup(MealFood)
  })

  describe('Test Meal paths', () => {
    test('it can get a single meal and all associated foods', () => {
      return Meal.create({
        name: 'Breakfast'
      })
      .then(meal => {
        return Food.bulkCreate([{
          name: 'Banana',
          calories: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mint',
          calories: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        }])
        .then(foods => {
          return MealFood.bulkCreate([{
            mealId: meal.id,
            foodId: foods[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            mealId: meal.id,
            foodId: foods[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }])
          .then(mealFoods => {
            return request(app).get(`/api/v1/meals/${meal.id}/foods`)
            .then(response => {
              expect(response.statusCode).toBe(200)
              expect(response.body.id).toBe(meal.id)
              expect(response.body.name).toBe('Breakfast')
              expect(response.body.foods.length).toBe(2)
              expect(response.body.foods[0].id).toBe(foods[0].id)
              expect(response.body.foods[0].name).toBe('Banana')
              expect(response.body.foods[0].calories).toBe(150)
              expect(response.body.foods[1].id).toBe(foods[1].id)
              expect(response.body.foods[1].name).toBe('Mint')
              expect(response.body.foods[1].calories).toBe(14)
            })
          })
        })
      })
    })

    test('it can get all existing Meals and their Foods', () => {
      return Meal.bulkCreate([
        {name: 'Lunch'},
        {name: 'Dinner'}
      ])
      .then(meal => {
        return Food.bulkCreate([{
          name: 'Meat',
          calories: 200
        },
        {
          name: 'Thyme',
          calories: 10
        },
        {
          name: 'Pasta',
          calories: 300
        }])
        .then(foods => {
          return MealFood.bulkCreate([{
            mealId: meal[0].id,
            foodId: foods[0].id
          },
          {
            mealId: meal[0].id,
            foodId: foods[1].id
          },
          {
            mealId: meal[1].id,
            foodId: foods[1].id
          },
          {
            mealId: meal[1].id,
            foodId: foods[2].id
          }])
          .then(mealFoods => {
            return request(app).get(`/api/v1/meals`)
            .then(response => {
              expect(response.body.length).toBe(2)
              expect(response.body[0].name).toBe('Lunch')
              expect(response.body[0].foods.length).toBe(2)
              expect(response.body[0].foods[0].id).toBe(foods[0].id)
              expect(response.body[0].foods[0].name).toBe('Meat')
              expect(response.body[0].foods[0].calories).toBe(200)
              expect(response.body[0].foods[1].id).toBe(foods[1].id)
              expect(response.body[0].foods[1].name).toBe('Thyme')
              expect(response.body[0].foods[1].calories).toBe(10)
              expect(response.body[1].name).toBe('Dinner')
              expect(response.body[1].foods.length).toBe(2)
              expect(response.body[1].foods[0].id).toBe(foods[1].id)
              expect(response.body[1].foods[0].name).toBe('Thyme')
              expect(response.body[1].foods[0].calories).toBe(10)
              expect(response.body[1].foods[1].id).toBe(foods[2].id)
              expect(response.body[1].foods[1].name).toBe('Pasta')
              expect(response.body[1].foods[1].calories).toBe(300)
            })
          })
        })
      })
    })

    test('it can delete an associated Food from an existing Meal', () => {
      return Meal.create({
        name: 'Lunch'
      })
      .then(meal => {
        return Food.bulkCreate([{
          name: 'Meat',
          calories: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Thyme',
          calories: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }])
        .then(foods => {
          return MealFood.bulkCreate([{
            mealId: meal.id,
            foodId: foods[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            mealId: meal.id,
            foodId: foods[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }])
          .then(mealFoods => {
            return request(app).get(`/api/v1/meals/${meal.id}/foods`)
            .then(response => {
              expect(response.body.name).toBe('Lunch')
              expect(response.body.foods.length).toBe(2)
              expect(response.body.foods[0].id).toBe(foods[0].id)
              expect(response.body.foods[0].name).toBe('Meat')
              expect(response.body.foods[0].calories).toBe(200)
              expect(response.body.foods[1].id).toBe(foods[1].id)
              expect(response.body.foods[1].name).toBe('Thyme')
              expect(response.body.foods[1].calories).toBe(10)
              return request(app).delete(`/api/v1/meals/${meal.id}/foods/${foods[0].id}`)
              .then(response => {
                expect(response.statusCode).toBe(204)
                return request(app).get(`/api/v1/meals/${meal.id}/foods/`)
                .then(response => {
                  expect(response.body.name).toBe('Lunch')
                  expect(response.body.foods.length).toBe(1)
                  expect(response.body.foods[0].id).not.toBe(foods[0].id)
                  expect(response.body.foods[0].name).not.toBe('Meat')
                  expect(response.body.foods[0].calories).not.toBe(200)
                  expect(response.body.foods[0].id).toBe(foods[1].id)
                  expect(response.body.foods[0].name).toBe('Thyme')
                  expect(response.body.foods[0].calories).toBe(10)
                })
              })
            })
          })
        })
      })
    })

    test('it can not delete an associated Food from a non-existent Meal', () => {
      return request(app).delete(`/api/v1/meals/1/foods/1`)
      .then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe('Meal not found')
      })
    })

    test('it can not delete a not associated Food from an existing Meal', () => {
      return Meal.create({
        name: 'Lunch'
      })
      .then(meal => {
        return request(app).delete(`/api/v1/meals/${meal.id}/foods/1`)
        .then(response => {
          expect(response.statusCode).toBe(404)
          expect(response.body.message).toBe('Food on that Meal not found')
        })
      })
    })

    test('it can create a meal on the database', () => {
      return request(app).post('/api/v1/meals')
        .send({name: 'Breakfast'})
        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(response.body.id).toBeGreaterThan(0)
          expect(response.body.name).toBe('Breakfast')
        })
    })

    test('it can associate a food with a meal', () => {
      return Meal.create({
        id: 1,
        name: 'Breakfast'
      })
      .then(meal => {
        return Food.create({
          id: 1,
          name: 'Banana',
          calories: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
      .then(food => {
        return request(app).post('/api/v1/meals/1/foods/1')
        .then(response => {
          console.log(response.body)
          expect(response.statusCode).toBe(201)
          expect(response.body.message).toBe('Successfully added Banana to Breakfast')
        })
      })
    })
  })
})
