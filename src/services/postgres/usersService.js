const { Pool } = require('pg');
 
class UsersService {
  constructor() {
    this._pool = new Pool();
  }
}