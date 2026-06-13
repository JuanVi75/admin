const Sectores = require("../models/sectores.model");

/* =========================
   LISTAR
========================= */
function listar(req, res) {
   Sectores.listarSectores((err, results) => {
      if (err) {
         console.log("Error sectores listar:", err);
         return res.status(500).json({ error: "Error en base de datos" });
      }

      res.json(results);
   });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {

   const { sector, subcategoria } = req.body;

   Sectores.crearSector(sector, subcategoria, (err, result) => {
      if (err) {
         console.log("Error crear sector:", err);
         return res.status(500).json({ error: "Error al crear sector" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   MODIFICAR
========================= */
function modificar(req, res) {

   const id = req.params.id;
   const { sector, subcategoria } = req.body;

   Sectores.modificarSector(id, sector, subcategoria, (err, result) => {
      if (err) {
         console.log("Error modificar sector:", err);
         return res.status(500).json({ error: "Error al modificar sector" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   BORRAR
========================= */
function borrar(req, res) {

   const id = req.params.id;

   Sectores.borrarSector(id, (err, result) => {
      if (err) {
         console.log("Error borrar sector:", err);
         return res.status(500).json({ error: "Error al borrar sector" });
      }

      res.json({ ok: true });
   });
}

/* =========================
   STATS
========================= */
function stats(req, res) {

   Sectores.stats((err, result) => {
      if (err) {
         console.log("Error stats sectores:", err);
         return res.status(500).json({ error: "Error stats sectores" });
      }

      res.json(result);
   });
}

module.exports = {
   listar,
   crear,
   modificar,
   borrar,
   stats
};
