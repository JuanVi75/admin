const db = require("../config/db");

function listarDepartamentos(callback) {
    const sql = "SELECT * FROM departamentos";
    db.query(sql, (err, results) => {
        callback(err, results);
    });
}

module.exports = {
    listarDepartamentos
};
