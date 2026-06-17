const Sucursales = require("../models/clientesSucursales.model");

/* =========================
   CLIENTES
========================= */
function listarClientes(req, res) {

   Sucursales.listarClientes((err, results) => {

      if (err) {
         console.error("CLIENTES LISTAR ERROR:", err);
         return res.status(500).json({ error: "DB error clientes" });
      }

      res.json(results);
   });
}

/* =========================
   SUCURSALES
========================= */
function listar(req, res) {

   Sucursales.listarSucursales((err, results) => {

      if (err) {
         console.error("SUCURSALES LISTAR ERROR:", err);
         return res.status(500).json({ error: "DB error sucursales" });
      }

      res.json(results);
   });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {

   Sucursales.crearSucursal(req.body, (err, result) => {

      if (err) {
         console.error("SUCURSALES CREATE ERROR:", err);
         return res.status(500).json({ error: "DB error sucursales" });
      }

      res.json({
         ok: true,
         result
      });
   });
}

/* =========================
   MODIFICAR
========================= */
function modificar(req, res) {

   const id = req.params.id;

   Sucursales.modificarSucursal(id, req.body, (err, result) => {

      if (err) {
         console.error("SUCURSALES UPDATE ERROR:", err);
         return res.status(500).json({ error: "DB error sucursales" });
      }

      res.json({
         ok: true,
         result
      });
   });
}

/* =========================
   BORRAR
========================= */
function borrar(req, res) {

   const id = req.params.id;

   Sucursales.borrarSucursal(id, (err, result) => {

      if (err) {
         console.error("SUCURSALES DELETE ERROR:", err);
         return res.status(500).json({ error: "DB error sucursales" });
      }

      res.json({
         ok: true,
         result
      });
   });
}

/* =========================
   STATS
========================= */
function stats(req, res) {

   Sucursales.stats((err, result) => {

      if (err) {
         console.error("SUCURSALES STATS ERROR:", err);
         return res.status(500).json({ error: "DB error sucursales" });
      }

      res.json(result);
   });
}

module.exports = {
   listarClientes,
   listar,
   crear,
   modificar,
   borrar,
   stats
};