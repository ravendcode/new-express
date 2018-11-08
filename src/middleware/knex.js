import knex from '../databases/connections/knex';

export default (req, res, next) => {
  req.knex = knex;
  next();
};
