import request from 'supertest';
import app from '../../../app';
import knex from '../../../databases/connections/knex';
import dbMigrate from '../../../helpers';

const url = '/api/user';
const param = '1';
const urlParam = `${url}/${param}`;

describe('API', () => {
  dbMigrate(knex);

  describe(`GET ${url}`, () => {
    test('should respond status and data', async () => {
      const res = await request(app).get(url);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('users');
    });
  });
  describe(`POST ${url}`, () => {
    test('should respond status and data', async () => {
      const data = {
        name: 'test',
        email: 'test@email.com',
        password: 'qwerty',
      };
      const res = await request(app)
        .post(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(data);
      expect(res.status).toEqual(201);
      expect(res.body.name).toEqual(data.name);
      expect(res.body.email).toEqual(data.email);
    });
  });
  describe(`GET ${urlParam}`, () => {
    test('should respond status and data', async () => {
      const res = await request(app).get(urlParam);
      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);
    });
  });
  describe(`PATCH ${urlParam}`, () => {
    test('should respond status and data', async () => {
      const data = {
        name: 'test',
      };
      const res = await request(app)
        .patch(urlParam)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(data);
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual(data.name);
    });
  });
  describe(`DELETE ${urlParam}`, () => {
    test('should respond status and data', async () => {
      const res = await request(app).del(urlParam);
      expect(res.status).toEqual(204);
    });
  });
});
