const db = require("../config/db");

/* =========================
   LISTAR (solo activos)
========================= */
function listarCiudades(callback) {
   const sql = `
        SELECT
            CAST(c.id AS CHAR) AS id,
            c.municipio,
            c.id_depto,
            d.depto AS departamento
        FROM ciudades c
        LEFT JOIN departamentos d
            ON d.id = c.id_depto
        WHERE c.is_deleted = 0
        ORDER BY CAST(c.id AS UNSIGNED) ASC
    `;

   db.query(sql, (err, results) => {
      callback(err, results);
   });
}

/* =========================
   CREAR
========================= */
function crearCiudad(id, municipio, id_depto, callback) {
   const sql = `
        INSERT INTO ciudades
        (id, municipio, id_depto, created_at, is_deleted)
        VALUES (?, ?, ?, NOW(), 0)
    `;

   db.query(sql, [id, municipio, id_depto], (err, result) => {
      callback(err, result);
   });
}

/* =========================
   MODIFICAR
========================= */
function modificarCiudad(id, municipio, id_depto, callback) {
   const sql = `
        UPDATE ciudades
        SET municipio = ?, id_depto = ?, updated_at = NOW()
        WHERE id = ?
    `;

   db.query(sql, [municipio, id_depto, id], (err, result) => {
      callback(err, result);
   });
}

/* =========================
   BORRAR (LÓGICO)
========================= */
function borrarCiudad(id, callback) {
   const sql = `
        UPDATE ciudades
        SET is_deleted = 1, deleted_at = NOW()
        WHERE id = ?
    `;

   db.query(sql, [id], (err, result) => {
      callback(err, result);
   });
}

/* =========================
   ÚLTIMO ID POR DEPTO
========================= */
function obtenerUltimoIdPorDepto(id_depto, callback) {
   const sql = `
        SELECT MAX(CAST(id AS UNSIGNED)) AS ultimo_id
        FROM ciudades
        WHERE id_depto = ?
          AND is_deleted = 0
    `;

   db.query(sql, [id_depto], (err, results) => {
      callback(err, results);
   });
}

module.exports = {
   listarCiudades,
   crearCiudad,
   modificarCiudad,
   borrarCiudad,
   obtenerUltimoIdPorDepto
};
