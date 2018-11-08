import config from '../../config';

const knexfile = require('../../../knexfile')[config.env];

export default require('knex')(knexfile);
