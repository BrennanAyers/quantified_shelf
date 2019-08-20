var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test food path', () => {
    test('It can get a single food from the database', () => {
      return request(app).get('/api/v1/foods/1').then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });
});
