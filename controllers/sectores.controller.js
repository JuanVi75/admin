const db = require("../config/db");

/* =========================
   LISTAR SECTORES
========================= */
function listar(req, res) {

   const sql = `
        SELECT 
            id,
            sector,
            subcategoria
        FROM sectores
        WHERE is_deleted = 0
        ORDER BY subcategoria ASC, sector ASC
    `;

   db.query(sql, (err, results) => {

      if (err) {
         console.log("Error en controller sectores (listar):", err);
         return res.status(500).json({ error: "Error en base de datos" });
      }

      res.json(results);
   });
}

/* =========================
   CREAR SECTOR
========================= */
function crear(req, res) {

   const { sector, subcategoria } = req.body;

   const sql = `
        INSERT INTO sectores (
            sector,
            subcategoria,
            created_at,
            updated_at,
            is_deleted
        )
        VALUES (?, ?, NOW(), NOW(), 0)
    `;

   db.query(sql, [sector, subcategoria], (err, result) => {

      if (err) {
         console.log("Error en controller sectores (crear):", err);
         return res.status(500).json({ error: "Error al crear sector" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   MODIFICAR SECTOR
========================= */
function modificar(req, res) {

   const id = req.params.id;
   const { sector, subcategoria } = req.body;

   const sql = `
        UPDATE sectores
        SET 
            sector = ?,
            subcategoria = ?,
            updated_at = NOW()
        WHERE id = ?
          AND is_deleted = 0
    `;

   db.query(sql, [sector, subcategoria, id], (err, result) => {

      if (err) {
         console.log("Error en controller sectores (modificar):", err);
         return res.status(500).json({ error: "Error al modificar sector" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   BORRAR (SOFT DELETE)
========================= */
function borrar(req, res) {

   const id = req.params.id;

   const sql = `
        UPDATE sectores
        SET 
            is_deleted = 1,
            deleted_at = NOW()
        WHERE id = ?
    `;

   db.query(sql, [id], (err, result) => {

      if (err) {
         console.log("Error en controller sectores (borrar):", err);
         return res.status(500).json({ error: "Error al borrar sector" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   ESTADÍSTICAS (IGUAL A DEPARTAMENTOS)
========================= */
function stats(req, res) {

   const sql = `
        SELECT 
            COUNT(*) AS total
        FROM sectores
        WHERE is_deleted = 0
    `;

   db.query(sql, (err, result) => {

      if (err) {
         console.log("ERROR REAL STATS SECTORES:", err);
         return res.status(500).json({ error: err.message });
      }

      res.json({
         total: result[0].total || 0,
         ingresados_hoy: 0,
         modificados_hoy: 0,
         eliminados_hoy: 0,
         ultima_actualizacion: null
      });
   });
}


module.exports = {
   listar,
   crear,
   modificar,
   borrar,
   stats
};
