import mysql from 'mysql2';
import util from 'util';
import dbConfig from '../config/db.config.js';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === `PROTOCOL_CONNECTION_LOST`) {
            console.error(`Database connection was closed.`);
        }
        if (err.code === `ER_CON_COUNT_ERROR`) {
            console.error(`Database has too many connections.`);
        }
        if (err.code === `ECONNREFUSED`) {
            console.error(`Database connection was refused.`);
        }
    }

    if (connection) connection.release();

    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
