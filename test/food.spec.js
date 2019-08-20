var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

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
    test('It can get a single food from the database', async () => {
       await agent.get('/api/v1/foods/1').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(1)
        expect(response.body.name).toBe('Banana')
        expect(response.body.calories).toBe(150)
      })
    });
  });
});
