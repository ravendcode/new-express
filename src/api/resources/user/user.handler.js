import jwt from 'jsonwebtoken';

import users from './user.model';

export default {
  findByParam(req, res, next, id) {
    const intId = parseInt(id, 10);
    const user = users.find(element => element.id === intId);
    if (user) {
      req.user = user;
      return next();
    }
    return res.throw(404);
  },
  getAll(req, res) {
    res.send({ users });
  },
  async createOne(req, res, next) {
    try {
      const newUser = {};
      newUser.id = users.length + 1;
      newUser.username = req.body.username;
      newUser.password = req.body.password;
      newUser.email = req.body.email;
      if (process.env.JWT_SECRET === undefined) {
        res.throw(500, 'JWT_SECRET is undefined');
      }
      const token = await jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
      newUser.accessToken = token;
      if (users.find(element => element.username === req.body.username)) {
        res.throw(422, { username: `${req.body.username} already taken` });
      }
      users.push(newUser);
      res.status(201);
      res.send({ ...newUser });
    } catch (err) {
      next(err);
    }
  },
  getOne(req, res) {
    res.send(req.user);
  },
  updateOne(req, res) {
    res.status(201).send({ data: 'updateOne' });
  },
  deleteOne(req, res) {
    res.status(204).send();
  },
};
