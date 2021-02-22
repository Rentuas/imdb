const request = require('supertest');
const Sequelize = require('sequelize');

const api = require('./../../src/server');
const { CONNECTION_STRING, DB_OPTIONS } = require('../../src/config/database');

const sequelizeConnection = new Sequelize(CONNECTION_STRING, DB_OPTIONS);


describe('User', () => {
  beforeEach(async () => {
    await sequelizeConnection.sync({ force: true });
  });

  it('should be create a new user', async () => {
    
    const newUser = await request(api).post('/users').send({
      firstName: "Fulano",
      lastName: "Ciclano",
      username: "fulano",
      password: "Aa123##0"
    });

    console.log(newUser.body)
    expect(newUser.status).toBe(200);

  });
});
