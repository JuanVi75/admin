const db = require("../config/db");

/* =========================
   LISTAR USUARIOS
========================= */
function listarUsuarios(callback) {

   const sql = `
      SELECT
         id,
         usuario,
         nombre,
         email,
         rol,
         estado,
         fecha_creacion,
         updated_at
      FROM usuarios
      WHERE is_deleted = 0
      ORDER BY nombre ASC
   `;

   db.query(sql, (err, results) => {
      callback(err, results);
   });
}

/* =========================
   CREAR USUARIO
========================= */
function crearUsuario(data, callback) {

   const {
      usuario,
      nombre,
      email,
      password,
      rol
   } = data;

   const sql = `
      INSERT INTO usuarios (
         usuario,
         nombre,
         email,
         password,
         rol,
         estado,
         fecha_creacion,
         is_deleted
      )
      VALUES (
         ?, ?, ?, ?, ?, 'ACTIVO', NOW(), 0
      )
   `;

   db.query(
      sql,
      [usuario, nombre, email, password, rol],
      (err, result) => {
         callback(err, result);
      }
   );
}

/* =========================
   MODIFICAR USUARIO
========================= */
function modificarUsuario(id, data, callback) {

   const {
      usuario,
      nombre,
      email,
      rol,
      estado
   } = data;

   const sql = `
      UPDATE usuarios
      SET
         usuario = ?,
         nombre = ?,
         email = ?,
         rol = ?,
         estado = ?,
         updated_at = NOW()
      WHERE id = ?
      AND is_deleted = 0
   `;

   db.query(
      sql,
      [usuario, nombre, email, rol, estado, id],
      (err, result) => {
         callback(err, result);
      }
   );
}

/* =========================
   BORRAR (SOFT DELETE)
========================= */
function borrarUsuario(id, callback) {

   const sql = `
      UPDATE usuarios
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

         SUM(CASE WHEN DATE(fecha_creacion)=CURDATE() THEN 1 ELSE 0 END) AS ingresados_hoy,
         SUM(CASE WHEN DATE(updated_at)=CURDATE() THEN 1 ELSE 0 END) AS modificados_hoy,
         SUM(CASE WHEN DATE(deleted_at)=CURDATE() THEN 1 ELSE 0 END) AS eliminados_hoy,

         MAX(fecha_creacion) AS ultima_actualizacion

      FROM usuarios
      WHERE is_deleted = 0
   `;

   db.query(sql, (err, result) => {
      if (err) {
         console.error("STATS ERROR:", err);
         return callback(err);
      }

      callback(null, {
         ...result[0],
         ultima_actualizacion: result[0]?.ultima_actualizacion || "2026-06-01"
      });
   });
}
module.exports = {
   listarUsuarios,
   crearUsuario,
   modificarUsuario,
   borrarUsuario,
   stats
};
