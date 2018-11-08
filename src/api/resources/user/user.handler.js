import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './user.model';

export default {
  async findByParam(req, res, next, id) {
    try {
      const intId = parseInt(id, 10);
      if (!intId) {
        return res.throw(404);
      }
      const user = await User.findById(req, intId);
      if (user.length) {
        [req.user] = user;
        return next();
      }
      return res.throw(404);
    } catch (err) {
      return next(err);
    }
  },
  async getAll(req, res, next) {
    try {
      const users = await User.findAll(req);
      res.send({ users });
    } catch (err) {
      next(err);
    }
  },
  async createOne(req, res, next) {
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
      };
      if (process.env.SECRET_KEY === undefined) {
        res.throw(500, 'SECRET_KEY is undefined');
      }
      if (process.env.SALT_ROUNDS === undefined) {
        res.throw(500, 'SALT_ROUNDS is undefined');
      }
      const nameR = await req.knex('users').where('name', req.body.name);
      if (nameR.length) {
        res.throw(422, { name: `${req.body.name} already taken` });
      }
      const emailR = await req.knex('users').where('email', req.body.email);
      if (emailR.length) {
        res.throw(422, { email: `${req.body.email} already taken` });
      }
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const password = await bcrypt.hash(req.body.password, saltRounds);
      newUser.password = password;
      const id = (await req.knex('users').insert(newUser))[0];
      const token = await jwt.sign({ id }, process.env.SECRET_KEY);
      await req.knex('users').where('id', id).update({ access_token: token });
      const user = (await req.knex('users').where('id', id))[0];
      res.status(201);
      res.send({ ...user });
    } catch (err) {
      next(err);
    }
  },
  getOne(req, res) {
    res.send(req.user);
  },
  async updateOne(req, res, next) {
    try {
      await User.update(req, req.user.id, req.body);
      const user = (await User.findById(req, req.user.id))[0];
      res.status(201);
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
  async deleteOne(req, res, next) {
    try {
      await User.delById(req, req.user.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};
