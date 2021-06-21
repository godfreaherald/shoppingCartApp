import mysql from 'mysql2';
import util from 'util';
import dbConfig from '../config/db.config.js';

const conn = mysql.createConnection({
    //connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

conn.query = util.promisify(conn.query);

module.exports = conn;
