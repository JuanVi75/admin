const Ciudades = require("../models/ciudades.model");
const db = require("../config/db");

/* =========================
   LISTAR
========================= */
function listar(req, res) {
   Ciudades.listarCiudades((err, results) => {
      if (err) {
         console.log("Error en controller ciudades:", err);
         return res.status(500).json({ error: "Error en base de datos" });
      }

      res.json(results);
   });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {

   const { id, municipio, id_depto } = req.body;

   Ciudades.crearCiudad(id, municipio, id_depto, (err, result) => {
      if (err) {
         console.log("Error en controller crear ciudad:", err);
         return res.status(500).json({ error: "Error al crear ciudad" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   MODIFICAR
========================= */
function modificar(req, res) {

   const id = req.params.id;
   const { municipio, id_depto } = req.body;

   Ciudades.modificarCiudad(id, municipio, id_depto, (err, result) => {
      if (err) {
         console.log("Error en controller modificar ciudad:", err);
         return res.status(500).json({ error: "Error al modificar ciudad" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   BORRAR
========================= */
function borrar(req, res) {

   const id = req.params.id;

   Ciudades.borrarCiudad(id, (err, result) => {
      if (err) {
         console.log("Error en controller borrar ciudad:", err);
         return res.status(500).json({ error: "Error al borrar ciudad" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   ULTIMO ID POR DEPTO
========================= */
function ultimoId(req, res) {

   const id_depto = req.params.id_depto;

   Ciudades.obtenerUltimoIdPorDepto(id_depto, (err, results) => {
      if (err) {
         console.log("Error en controller ultimo id ciudad:", err);
         return res.status(500).json({ error: "Error obteniendo ultimo id" });
      }

      const lastId = results?.[0]?.ultimo_id || null;

      res.json({ lastId });
   });
}

/* =========================
   ESTADÍSTICAS CIUDADES
========================= */
function stats(req, res) {

   const sql = `
      SELECT 
         COUNT(*) AS total,

         SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS ingresados_hoy,

         SUM(CASE 
            WHEN updated_at IS NOT NULL 
            AND DATE(updated_at) = CURDATE() 
            THEN 1 ELSE 0 
         END) AS modificados_hoy,

         SUM(CASE 
            WHEN is_deleted = 1 
            AND DATE(deleted_at) = CURDATE() 
            THEN 1 ELSE 0 
         END) AS eliminados_hoy,

         GREATEST(
            COALESCE(MAX(created_at), '1970-01-01'),
            COALESCE(MAX(updated_at), '1970-01-01'),
            COALESCE(MAX(deleted_at), '1970-01-01')
         ) AS ultima_actualizacion

      FROM ciudades;
   `;

   db.query(sql, (err, result) => {
      if (err) {
         console.log("Error stats ciudades:", err);
         return res.status(500).json({ error: "Error stats ciudades" });
      }

      res.json(result[0]);
   });
}

module.exports = {
   listar,
   crear,
   modificar,
   borrar,
   ultimoId,
   stats
};
