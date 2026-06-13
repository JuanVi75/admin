const db = require("../config/db");

/* LISTAR */
function listar(req, res) {

   const sql = `
        SELECT 
            id,
            sector,
            subcategoria,
            created_at,
            updated_at,
            deleted_at,
            is_deleted
        FROM sectores
        WHERE is_deleted = 0
        ORDER BY sector ASC, subcategoria ASC
    `;

   db.query(sql, (err, results) => {
      if (err) {
         console.log("Error sectores listar:", err);
         return res.status(500).json({ error: "Error en base de datos" });
      }

      res.json(results);
   });
}

/* CREAR */
function crear(req, res) {

   const { sector, subcategoria } = req.body;

   const sql = `
        INSERT INTO sectores (sector, subcategoria, created_at, is_deleted)
        VALUES (?, ?, NOW(), 0)
    `;

   db.query(sql, [sector, subcategoria], (err, result) => {
      if (err) {
         console.log("Error sectores crear:", err);
         return res.status(500).json({ error: "Error creando sector" });
      }

      res.json({ ok: true });
   });
}

/* MODIFICAR */
function modificar(req, res) {

   const id = req.params.id;
   const { sector, subcategoria } = req.body;

   const sql = `
        UPDATE sectores 
        SET sector = ?, subcategoria = ?, updated_at = NOW()
        WHERE id = ?
        AND is_deleted = 0
    `;

   db.query(sql, [sector, subcategoria, id], (err, result) => {
      if (err) {
         console.log("Error sectores modificar:", err);
         return res.status(500).json({ error: "Error modificando sector" });
      }

      res.json({ ok: true });
   });
}

/* ELIMINAR */
function borrar(req, res) {

   const id = req.params.id;

   const sql = `
        UPDATE sectores 
        SET is_deleted = 1, deleted_at = NOW()
        WHERE id = ?
    `;

   db.query(sql, [id], (err, result) => {
      if (err) {
         console.log("Error sectores borrar:", err);
         return res.status(500).json({ error: "Error eliminando sector" });
      }

      res.json({ ok: true });
   });
}

/* STATS */
function stats(req, res) {

   const sql = `
        SELECT 
            COUNT(*) AS total,
            SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS ingresados_hoy,
            SUM(CASE WHEN DATE(updated_at) = CURDATE() THEN 1 ELSE 0 END) AS modificados_hoy,
            SUM(CASE WHEN is_deleted = 1 AND DATE(deleted_at) = CURDATE() THEN 1 ELSE 0 END) AS eliminados_hoy,
            GREATEST(
                COALESCE(MAX(created_at), '1970-01-01'),
                COALESCE(MAX(updated_at), '1970-01-01'),
                COALESCE(MAX(deleted_at), '1970-01-01')
            ) AS ultima_actualizacion
        FROM sectores;
    `;

   db.query(sql, (err, result) => {
      if (err) {
         console.log("Error sectores stats:", err);
         return res.status(500).json({ error: "Error stats" });
      }

      res.json(result[0]);
   });
}

module.exports = {
   listar,
   crear,
   modificar,
   borrar,
   stats
};
