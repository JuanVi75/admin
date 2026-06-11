const db = require("../config/db");

/* =========================
   LISTAR
========================= */
function listarDepartamentos(callback) {
    const sql = "SELECT * FROM departamentos ORDER BY id ASC";
    db.query(sql, (err, results) => {
        callback(err, results);
    });
}

/* =========================
   CREAR
========================= */
function crearDepartamento(id, depto, callback) {
    const sql = "INSERT INTO departamentos (id, depto) VALUES (?, ?)";

    db.query(sql, [id, depto], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   MODIFICAR
========================= */
function modificarDepartamento(id, depto, callback) {
    const sql = "UPDATE departamentos SET depto = ? WHERE id = ?";

    db.query(sql, [depto, id], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   BORRAR
========================= */
function borrarDepartamento(id, callback) {
    const sql = "DELETE FROM departamentos WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
}

module.exports = {
    listarDepartamentos,
    crearDepartamento,
    modificarDepartamento,
    borrarDepartamento
};
