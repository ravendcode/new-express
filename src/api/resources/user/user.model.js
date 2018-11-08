// export default [
//   // { id: 1, username: 'root' },
//   // { id: 2, username: 'test' },
//   // { id: 3, username: 'vova' },
// ];

const tableName = 'users';
const fields = ['id', 'name', 'email', 'roles', 'created_at', 'updated_at'];

export default class User {
  static findById(req, id) {
    return req.knex.select(...fields).from(tableName).where('id', id);
  }

  static findAll(req) {
    return req.knex.select(...fields).from(tableName);
  }

  static update(req, id, data) {
    return req.knex(tableName).where('id', id).update(data);
  }

  static delById(req, id) {
    return req.knex(tableName).where('id', id).del();
  }
}
