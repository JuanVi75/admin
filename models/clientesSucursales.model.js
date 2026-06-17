const db = require("../config/db");

/* =========================
   CLIENTES
========================= */
function listarClientes(callback) {

   const sql = `
      SELECT
         id,
         cliente
      FROM clientes
      WHERE estado = 'ACTIVO'
      ORDER BY cliente ASC
   `;

   db.query(sql, (err, results) => {
      callback(err, results);
   });
}

/* =========================
   LISTAR CONTACTOS
========================= */
function listarContactos(callback) {

   const sql = `
      SELECT
         cc.id,
         cc.cliente_id,
         c.cliente AS cliente_nombre,
         cc.nombre,
         cc.cargo,
         cc.telefono,
         cc.email,
         cc.tipo
      FROM cliente_contactos cc
      LEFT JOIN clientes c
         ON c.id = cc.cliente_id
      WHERE cc.is_deleted = 0
      ORDER BY c.cliente ASC, cc.nombre ASC
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
      tipo
   } = data;

   // 🔴 1. BUSCAR DUPLICADO EXACTO (ignorando mayúsculas/minúsculas)
   const checkSql = `
      SELECT id, is_deleted
      FROM cliente_contactos
      WHERE cliente_id = ?
        AND LOWER(nombre) = LOWER(?)
        AND LOWER(cargo) = LOWER(?)
        AND LOWER(telefono) = LOWER(?)
        AND LOWER(email) = LOWER(?)
        AND LOWER(tipo) = LOWER(?)
      LIMIT 1
   `;

   db.query(
      checkSql,
      [cliente_id, nombre, cargo, telefono, email, tipo],
      (err, rows) => {

         if (err) return callback(err);

         // 🔴 2. SI EXISTE
         if (rows.length > 0) {

            const existing = rows[0];

            // CASO A: estaba eliminado → REACTIVAR
            if (existing.is_deleted == 1) {

               const reactivateSql = `
                  UPDATE cliente_contactos
                  SET is_deleted = 0,
                      estado = 'ACTIVO',
                      updated_at = NOW()
                  WHERE id = ?
               `;

               return db.query(reactivateSql, [existing.id], (err2, result) => {
                  if (err2) return callback(err2, null);

                  return callback(null, {
                     action: "reactivated",
                     id: existing.id
                  });
               });
            }

            // CASO B: ya existe activo
            return callback(null, {
               action: "exists",
               id: existing.id
            });
         }

         // 🔴 3. SI NO EXISTE → INSERTAR
         const insertSql = `
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
            VALUES (
               ?, ?, ?, ?, ?, ?,
               'ACTIVO',
               NOW(),
               0
            )
         `;

         db.query(
            insertSql,
            [
               cliente_id,
               nombre,
               cargo,
               telefono,
               email,
               tipo
            ],
            (err2, result) => {

               if (err2) return callback(err2, null);

               return callback(null, {
                  action: "created",
                  id: result.insertId
               });
            }
         );
      }
   );
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
      tipo
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
         updated_at = NOW()
      WHERE id = ?
      AND is_deleted = 0
   `;

   db.query(
      sql,
      [
         cliente_id,
         nombre,
         cargo,
         telefono,
         email,
         tipo,
         id
      ],
      (err, result) => {
         callback(err, result);
      }
   );
}

/* =========================
   BORRAR
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

         SUM(
            CASE
               WHEN DATE(created_at) = CURDATE()
               THEN 1
               ELSE 0
            END
         ) AS ingresados_hoy,

         SUM(
            CASE
               WHEN DATE(updated_at) = CURDATE()
               THEN 1
               ELSE 0
            END
         ) AS modificados_hoy,

         SUM(
            CASE
               WHEN DATE(deleted_at) = CURDATE()
               THEN 1
               ELSE 0
            END
         ) AS eliminados_hoy,

         GREATEST(
            COALESCE(MAX(created_at),'2026-06-01'),
            COALESCE(MAX(updated_at),'2026-06-01'),
            COALESCE(MAX(deleted_at),'2026-06-01')
         ) AS ultima_actualizacion

      FROM cliente_contactos
      WHERE is_deleted = 0
   `;

   db.query(sql, (err, result) => {
      callback(err, result[0]);
   });
}

module.exports = {
   listarClientes,
   listarContactos,
   crearContacto,
   modificarContacto,
   borrarContacto,
   stats
};
