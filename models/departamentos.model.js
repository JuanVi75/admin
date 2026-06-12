const db = require("../config/db");

/* =========================
   LISTAR (solo activos)
========================= */
function listarDepartamentos(callback) {
    const sql = `
        SELECT 
            id,
            depto,
            created_at,
            updated_at,
            deleted_at,
            is_deleted
        FROM departamentos
        WHERE is_deleted = 0
        ORDER BY CAST(id AS UNSIGNED) ASC
    `;

    db.query(sql, (err, results) => {
        callback(err, results);
    });
}

/* =========================
   CREAR
========================= */
function crearDepartamento(id, depto, callback) {
    const sql = `
        INSERT INTO departamentos (id, depto, created_at, is_deleted)
        VALUES (?, ?, NOW(), 0)
    `;

    db.query(sql, [id, depto], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   MODIFICAR
========================= */
function modificarDepartamento(id, depto, callback) {
    const sql = `
        UPDATE departamentos 
        SET depto = ?, updated_at = NOW()
        WHERE id = ?
          AND is_deleted = 0
    `;

    db.query(sql, [depto, id], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   BORRAR (LÓGICO)
========================= */
function borrarDepartamento(id, callback) {
    const sql = `
        UPDATE departamentos 
        SET is_deleted = 1, deleted_at = NOW()
        WHERE id = ?
    `;

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
