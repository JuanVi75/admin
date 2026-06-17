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
   LISTAR SUCURSALES
========================= */
function listarSucursales(callback) {

   const sql = `
      SELECT
         cs.id,
         cs.cliente_id,
         c.cliente AS cliente_nombre,
         cs.nombre,
         cs.ciudad,
         cs.direccion,
         cs.telefono,
         cs.contacto,
         cs.estado
      FROM cliente_sucursales cs
      LEFT JOIN clientes c
         ON c.id = cs.cliente_id
      WHERE cs.is_deleted = 0
      ORDER BY c.cliente ASC, cs.nombre ASC
   `;

   db.query(sql, (err, results) => {
      callback(err, results);
   });
}

/* =========================
   CREAR (CON DUPLICADO + REACTIVAR)
========================= */
function crearSucursal(data, callback) {

   const {
      cliente_id,
      nombre,
      ciudad,
      direccion,
      telefono,
      contacto
   } = data;

   const checkSql = `
      SELECT id, is_deleted
      FROM cliente_sucursales
      WHERE cliente_id = ?
        AND LOWER(nombre) = LOWER(?)
        AND LOWER(COALESCE(ciudad,'')) = LOWER(COALESCE(?,''))
        AND LOWER(COALESCE(direccion,'')) = LOWER(COALESCE(?,''))
        AND LOWER(COALESCE(telefono,'')) = LOWER(COALESCE(?,''))
        AND LOWER(COALESCE(contacto,'')) = LOWER(COALESCE(?,''))
      LIMIT 1
   `;

   db.query(
      checkSql,
      [cliente_id, nombre, ciudad, direccion, telefono, contacto],
      (err, rows) => {

         if (err) return callback(err);

         if (rows.length > 0) {

            const existing = rows[0];

            // REACTIVAR SI ESTABA BORRADO
            if (existing.is_deleted == 1) {

               const reactivateSql = `
                  UPDATE cliente_sucursales
                  SET is_deleted = 0,
                      estado = 'ACTIVO',
                      updated_at = NOW()
                  WHERE id = ?
               `;

               return db.query(reactivateSql, [existing.id], (err2) => {
                  if (err2) return callback(err2);

                  return callback(null, {
                     action: "reactivated",
                     id: existing.id
                  });
               });
            }

            return callback(null, {
               action: "exists",
               id: existing.id
            });
         }

         const insertSql = `
            INSERT INTO cliente_sucursales (
               cliente_id,
               nombre,
               ciudad,
               direccion,
               telefono,
               contacto,
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
               ciudad,
               direccion,
               telefono,
               contacto
            ],
            (err2, result) => {

               if (err2) return callback(err2);

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
function modificarSucursal(id, data, callback) {

   const {
      cliente_id,
      nombre,
      ciudad,
      direccion,
      telefono,
      contacto,
      estado
   } = data;

   const sql = `
      UPDATE cliente_sucursales
      SET
         cliente_id = ?,
         nombre = ?,
         ciudad = ?,
         direccion = ?,
         telefono = ?,
         contacto = ?,
         estado = ?,
         updated_at = NOW()
      WHERE id = ?
      AND is_deleted = 0
   `;

   db.query(
      sql,
      [
         cliente_id,
         nombre,
         ciudad,
         direccion,
         telefono,
         contacto,
         estado,
         id
      ],
      (err, result) => {
         callback(err, result);
      }
   );
}

/* =========================
   BORRAR (SOFT DELETE)
========================= */
function borrarSucursal(id, callback) {

   const sql = `
      UPDATE cliente_sucursales
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
               THEN 1 ELSE 0
            END
         ) AS ingresados_hoy,

         SUM(
            CASE
               WHEN DATE(updated_at) = CURDATE()
               THEN 1 ELSE 0
            END
         ) AS modificados_hoy,

         SUM(
            CASE
               WHEN DATE(deleted_at) = CURDATE()
               THEN 1 ELSE 0
            END
         ) AS eliminados_hoy,

         GREATEST(
            COALESCE(MAX(created_at),'1970-01-01'),
            COALESCE(MAX(updated_at),'1970-01-01'),
            COALESCE(MAX(deleted_at),'1970-01-01')
         ) AS ultima_actualizacion

      FROM cliente_sucursales
      WHERE is_deleted = 0
   `;

   db.query(sql, (err, result) => {
      callback(err, result[0]);
   });
}

module.exports = {
   listarClientes,
   listarSucursales,
   crearSucursal,
   modificarSucursal,
   borrarSucursal,
   stats
};