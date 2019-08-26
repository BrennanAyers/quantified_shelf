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
  })
})
