var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var cleanup = require('./helper/testCleanup');
var Meal = require('../models').Meal
var Food = require('../models').Food

describe('api', () =>{
  beforeEach(() => {
    cleanup(Meal)
  })
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
        updatedAt: new Date(),
        meals: meal
      },
      {
        name: 'Mint',
        calories: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
        meals: meal
      }])
      .then(() => {
        return request(app).get('/api/v1/meals/1/foods').then(response => {
          expect(response.statusCode).toBe(200)
        })
      })
    })
  })
})
