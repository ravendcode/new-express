const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.seed = async (knex, Promise) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const passwordOne = await bcrypt.hash('qwerty', saltRounds);
  const passwordTwo = await bcrypt.hash('qwerty', saltRounds);
  const passwordThree = await bcrypt.hash('qwerty', saltRounds);
  const tokenOne = await jwt.sign({
    id: 1
  }, process.env.SECRET_KEY);
  const tokenTw0 = await jwt.sign({
    id: 2
  }, process.env.SECRET_KEY);
  const tokenThree = await jwt.sign({
    id: 3
  }, process.env.SECRET_KEY);
  const roleAdmin = JSON.stringify(['ROLE_USER', 'ROLE_ADMIN']);
  const roleUser = JSON.stringify(['ROLE_USER']);
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([{
          id: 1,
          name: 'root',
          email: 'root@email.com',
          password: passwordOne,
          access_token: tokenOne,
          roles: roleAdmin,
          // created_at: knex.fn.now(),
          // created_at: knex.raw('CURRENT_TIMESTAMP'),
        },
        {
          id: 2,
          name: 'vova',
          email: 'vova@email.com',
          password: passwordTwo,
          access_token: tokenTw0,
          roles: roleUser
        },
        {
          id: 3,
          name: 'bob',
          email: 'bob@email.com',
          password: passwordThree,
          access_token: tokenThree,
          roles: roleUser
        },
      ]);
    });
};
