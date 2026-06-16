const db = require("../config/db");

/* =========================
   LISTAR
========================= */
function listarContactos(callback) {

   const sql = `
      SELECT
         id,
         cliente_id,
         nombre,
         cargo,
         telefono,
         email,
         tipo,
         estado,
         created_at,
         updated_at,
         deleted_at,
         is_deleted
      FROM cliente_contactos
      WHERE is_deleted = 0
      ORDER BY nombre ASC
   `;

   db.query(sql, (err, results) => {
      callback(err, results);
   });
}

/* =========================
   CREAR
========================= */
function crearContacto(data, callback) {

   const {
      cliente_id,
      nombre,
      cargo,
      telefono,
      email,
      tipo,
      estado
   } = data;

   const sql = `
      INSERT INTO cliente_contactos (
         cliente_id,
         nombre,
         cargo,
         telefono,
         email,
         tipo,
         estado,
         created_at,
         is_deleted
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, '2026-06-01 00:00:00', 0)
   `;

   db.query(sql, [
      cliente_id,
      nombre,
      cargo,
      telefono,
      email,
      tipo,
      estado
   ], (err, result) => {
      callback(err, result);
   });
}

/* =========================
   MODIFICAR
========================= */
function modificarContacto(id, data, callback) {

   const {
      cliente_id,
      nombre,
      cargo,
      telefono,
      email,
      tipo,
      estado
   } = data;

   const sql = `
      UPDATE cliente_contactos
      SET
         cliente_id = ?,
         nombre = ?,
         cargo = ?,
         telefono = ?,
         email = ?,
         tipo = ?,
         estado = ?,
         updated_at = NOW()
      WHERE id = ?
        AND is_deleted = 0
   `;

   db.query(sql, [
      cliente_id,
      nombre,
      cargo,
      telefono,
      email,
      tipo,
      estado,
      id
   ], (err, result) => {
      callback(err, result);
   });
}

/* =========================
   BORRAR (LOGICO)
========================= */
function borrarContacto(id, callback) {

   const sql = `
      UPDATE cliente_contactos
      SET
         is_deleted = 1,
         deleted_at = NOW()
      WHERE id = ?
   `;

   db.query(sql, [id], (err, result) => {
      callback(err, result);
   });
}

/* =========================
   STATS
========================= */
function stats(callback) {

   const sql = `
      SELECT
         COUNT(*) AS total,

         SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS ingresados_hoy,

         SUM(CASE WHEN DATE(updated_at) = CURDATE() THEN 1 ELSE 0 END) AS modificados_hoy,

         SUM(CASE WHEN DATE(deleted_at) = CURDATE() THEN 1 ELSE 0 END) AS eliminados_hoy,

         GREATEST(
            COALESCE(MAX(created_at), '1970-01-01'),
            COALESCE(MAX(updated_at), '1970-01-01'),
            COALESCE(MAX(deleted_at), '1970-01-01')
         ) AS ultima_actualizacion

      FROM cliente_contactos
      WHERE is_deleted = 0;
   `;

   db.query(sql, (err, result) => {
      callback(err, result[0]);
   });
}

module.exports = {
   listarContactos,
   crearContacto,
   modificarContacto,
   borrarContacto,
   stats
};