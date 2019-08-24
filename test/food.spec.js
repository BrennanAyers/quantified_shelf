var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var cleanup = require('./helper/testCleanup');
var Food = require('../models').Food

describe('api', () => {
  beforeEach((done) => {
    cleanup(Food)
    server = app.listen(3000, (err) => {
    if (err) return done(err);
      agent = request.agent(server);
      done();
    });
  });
  afterEach((done) => {
    return server && server.close(done);
  });

  describe('Test food path', () => {
    test('It can get a single food from the database', () => {
      return Food.create({
        name: 'Banana',
        calories: 150
      })
      .then(food => {
        return request(app).get(`/api/v1/foods/${food.id}`)
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.id).toBe(food.id)
          expect(response.body.name).toBe('Banana')
          expect(response.body.calories).toBe(150)
        })
      })
    });

    test("It won't return a food if the id is invalid", () => {
      return request(app).get('/api/v1/foods/500').then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe('Food not found')
      })
    })

    test('It can get all foods from the database', () => {
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
        return request(app).get('/api/v1/foods').then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body[0].id).toBe(foods[0].id)
          expect(response.body[0].name).toBe('Banana')
          expect(response.body[0].calories).toBe(150)
          expect(response.body[1].id).toBe(foods[1].id)
          expect(response.body[1].name).toBe('Mint')
          expect(response.body[1].calories).toBe(14)
        })
      })
    });

    test('It can create a new food in the database', () => {
      return request(app).post('/api/v1/foods')
        .send('name=Test&calories=100')
        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(response.body.id).toBeGreaterThan(0)
          expect(response.body.name).toBe('Test')
          expect(response.body.calories).toBe(100)
        })
    })

    test("It can't create a food in the database if missing calories parameter", () => {
      return request(app).post('/api/v1/foods')
        .send('name=Test')
        .then(response => {
          expect(response.statusCode).toBe(500)
        })
      })

    test("It can't create a food in the database if missing name parameter", () => {
      return request(app).post('/api/v1/foods')
        .send('calories=55')
        .then(response => {
          expect(response.statusCode).toBe(500)
        })
      })

    test('It can delete an existing food in the database', () => {
      return Food.create({
        name: 'Donut',
        calories: 1000
      })
      .then(food => {
        return request(app).delete(`/api/v1/foods/${food.id}`)
        .then(response => {
          expect(response.statusCode).toBe(204)
        })
      })
    })

    test('It can not delete a non-existant food in the database', () => {
      return request(app).delete(`/api/v1/foods/1`)
      .then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe('Food not found')
      })
    })

    test('It can edit a food in the database', () => {
      return Food.create({
        name: 'Banana',
        calories: 150
      })
      .then(food => {
        return request(app).patch(`/api/v1/foods/${food.id}`)
        .send({name: 'Test', calories: 100})
        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(response.body.id).toBe(food.id)
          expect(response.body.name).toBe('Test')
          expect(response.body.calories).toBe(100)
        })
      })
    })
  });
});
