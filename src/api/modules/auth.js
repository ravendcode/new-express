import jwt from 'jsonwebtoken';

import users from '../resources/user/user.model';

export const login = (req, res, next) => {
  try {
    const user = users.find(element => element.username === req.body.username);
    if (!user || user.password !== req.body.password) {
      res.throw(401, 'Invalid user');
    }
    res.send({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const me = (req, res) => {
  res.send(req.user);
};

export const jwtMdw = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const bearerToken = token.replace('Bearer ', '');
    if (process.env.SECRET_KEY === undefined) {
      res.throw(500, 'SECRET_KEY is undefined');
    }
    const decode = await jwt.verify(bearerToken, process.env.SECRET_KEY);

    const user = users.find(element => element.id === decode.id && element.accessToken === bearerToken);

    if (!user) {
      res.throw(401, 'Invalid user');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
