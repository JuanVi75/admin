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

module.exports = {
   listar,
   crear,
   modificar,
   borrar,
   ultimoId
};
