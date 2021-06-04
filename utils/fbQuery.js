const Firebird = require('node-firebird');

const getDB = (req) => {
  return new Promise((resolve, reject) => {
    var options = {};
    options.host = req.body.connection.host || "localhost";
    options.port = req.body.connection.port || 3050;
    options.database = req.body.connection.database;
    options.user = req.body.connection.username || "SYSDBA";
    options.password = req.body.connection.password || "masterkey";
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null;            // default
    options.pageSize = 4096;        // default when creating database
    const pool = Firebird.pool(5, options);
    pool.get((err, db) => {
        if (err)
            reject(err)
        resolve(db)
    })
  });
}

const executeQuery = (db, queryToBeExecuted) => {
    return new Promise((resolve, reject) => {
        db.query(queryToBeExecuted, function (err, result) {
            if (err)
                reject(err)
            resolve(result)
            db.detach();
        })
    })
}

module.exports = { getDB, executeQuery }