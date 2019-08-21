var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var Food = require('../models').Food

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach((done) => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
      server = app.listen(3000, (err) => {
      if (err) return done(err);
       agent = request.agent(server);
       done();
    });
  });
  afterEach((done) => {
    shell.exec('npx sequelize db:migrate:undo:all')
    return server && server.close(done);
  });

  describe('Test food path', () => {
    test('It can get a single food from the database', () => {
      return request(app).get('/api/v1/foods/1').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(1)
        expect(response.body.name).toBe('Banana')
        expect(response.body.calories).toBe(150)
      })
    });

    test('It can get all foods from the database', () =>{
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body[0].id).toBe(1)
        expect(response.body[0].name).toBe('Banana')
        expect(response.body[0].calories).toBe(150)
        expect(response.body[1].id).toBe(2)
        expect(response.body[1].name).toBe('Mint')
        expect(response.body[1].calories).toBe(14)
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

    test('It can delete an existing food in the database', () => {
      return Food.create({name: 'Donut', calories: 1000, createdAt: new Date(), updatedAt: new Date()})
      .then(food => {
        return request(app).delete(`/api/v1/foods/${food.id}`)
        .then(response => {
          expect(response.statusCode).toBe(204)
        })
      })
    })
  });
});
