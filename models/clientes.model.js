const db = require("../config/db");

/* =========================
   LISTAR TODOS
========================= */
function getAllClientes(callback) {

   const sql = `
      SELECT * 
      FROM clientes 
      ORDER BY cliente ASC
   `;

   db.query(sql, (err, rows) => {
      callback(err, rows);
   });
}

/* =========================
   OBTENER POR ID
========================= */
function getClienteById(id, callback) {

   const sql = `
      SELECT * 
      FROM clientes 
      WHERE id = ?
   `;

   db.query(sql, [id], (err, rows) => {
      callback(err, rows[0]);
   });
}

/* =========================
   CREAR
========================= */
function createCliente(data, callback) {

   const sql = `
      INSERT INTO clientes (
         id, cliente, direccion, telefono, ciudad, departamento,
         ciudad_id, departamento_id, email, sector, sector_id,
         contacto, tel_contacto, asesor, maneja_sucursales, estado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `;

   const values = [
      data.id,
      data.cliente,
      data.direccion || null,
      data.telefono || null,
      data.ciudad || null,
      data.departamento || null,
      data.ciudad_id || null,
      data.departamento_id || null,
      data.email || null,
      data.sector || null,
      data.sector_id || null,
      data.contacto || null,
      data.tel_contacto || null,
      data.asesor || null,
      data.maneja_sucursales || "NO",
      data.estado || "ACTIVO"
   ];

   db.query(sql, values, (err, result) => {
      callback(err, result);
   });
}

/* =========================
   ACTUALIZAR
========================= */
function updateCliente(id, data, callback) {

   const sql = `
      UPDATE clientes SET
         cliente = ?,
         direccion = ?,
         telefono = ?,
         ciudad = ?,
         departamento = ?,
         ciudad_id = ?,
         departamento_id = ?,
         email = ?,
         sector = ?,
         sector_id = ?,
         contacto = ?,
         tel_contacto = ?,
         asesor = ?,
         maneja_sucursales = ?,
         estado = ?
      WHERE id = ?
   `;

   const values = [
      data.cliente,
      data.direccion || null,
      data.telefono || null,
      data.ciudad || null,
      data.departamento || null,
      data.ciudad_id || null,
      data.departamento_id || null,
      data.email || null,
      data.sector || null,
      data.sector_id || null,
      data.contacto || null,
      data.tel_contacto || null,
      data.asesor || null,
      data.maneja_sucursales || "NO",
      data.estado || "ACTIVO",
      id
   ];

   db.query(sql, values, (err, result) => {
      callback(err, result);
   });
}

/* =========================
   ELIMINAR
========================= */
function deleteCliente(id, callback) {

   const sql = `
      DELETE FROM clientes 
      WHERE id = ?
   `;

   db.query(sql, [id], (err, result) => {
      callback(err, result);
   });
}

module.exports = {
   getAllClientes,
   getClienteById,
   createCliente,
   updateCliente,
   deleteCliente
};
