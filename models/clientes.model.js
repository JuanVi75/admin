// models/clientes.model.js

const db = require("../db"); // ajusta a tu conexión real

/* =========================
   LISTAR TODOS
========================= */
async function getAllClientes() {
   const [rows] = await db.query(
      "SELECT * FROM clientes ORDER BY cliente ASC"
   );
   return rows;
}

/* =========================
   OBTENER POR ID
========================= */
async function getClienteById(id) {
   const [rows] = await db.query(
      "SELECT * FROM clientes WHERE id = ?",
      [id]
   );
   return rows[0];
}

/* =========================
   CREAR
========================= */
async function createCliente(data) {
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

   const [result] = await db.query(sql, values);
   return result;
}

/* =========================
   ACTUALIZAR
========================= */
async function updateCliente(id, data) {
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

   const [result] = await db.query(sql, values);
   return result;
}

/* =========================
   ELIMINAR
========================= */
async function deleteCliente(id) {
   const [result] = await db.query(
      "DELETE FROM clientes WHERE id = ?",
      [id]
   );
   return result;
}

module.exports = {
   getAllClientes,
   getClienteById,
   createCliente,
   updateCliente,
   deleteCliente
};