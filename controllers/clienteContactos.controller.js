const Contactos = require("../models/clienteContactos.model");

/* =========================
   CLIENTES
========================= */
function listarClientes(req, res) {

   Contactos.listarClientes((err, results) => {

      if (err) {
         console.error("CLIENTES LISTAR ERROR:", err);
         return res.status(500).json({ error: "DB error clientes" });
      }

      res.json(results);
   });
}

/* =========================
   CONTACTOS
========================= */
function listar(req, res) {

   Contactos.listarContactos((err, results) => {

      if (err) {
         console.error("CONTACTOS LISTAR ERROR:", err);
         return res.status(500).json({ error: "DB error contactos" });
      }

      res.json(results);
   });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {

   Contactos.crearContacto(req.body, (err, result) => {

      if (err) {
         console.error("CONTACTOS CREATE ERROR:", err);
         return res.status(500).json({ error: "DB error contactos" });
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

   Contactos.modificarContacto(id, req.body, (err, result) => {

      if (err) {
         console.error("CONTACTOS UPDATE ERROR:", err);
         return res.status(500).json({ error: "DB error contactos" });
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

   Contactos.borrarContacto(id, (err, result) => {

      if (err) {
         console.error("CONTACTOS DELETE ERROR:", err);
         return res.status(500).json({ error: "DB error contactos" });
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

   Contactos.stats((err, result) => {

      if (err) {
         console.error("CONTACTOS STATS ERROR:", err);
         return res.status(500).json({ error: "DB error contactos" });
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
